import React, {useContext, useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import DataContext from '../context/DataContext';
import axios from '../api/axios';
import ItemDetails from '../components/ItemDetails';
import ItemGrids from '../components/ItemGrids';
import { FaSpinner, FaArrowLeft } from "react-icons/fa";
import { AppName } from '../components/General';
import AddToCart from '../components/AddToCart';
import swal from 'sweetalert';

const Details = () => {
    const {itemSlug, pageNo} = useParams();
    const [pageContent, setPageContent] = useState("");
    const [pageIndex, setPageIndex] = useState("");
    const [itemTitle, setItemTitle] = useState("");
    const [itemSize, setItemSize] = useState(0);
    const [itemQty, setItemQty] = useState(1);
    const {user, cartItems, handleCart, handleCartItems, SuccessToast, ErrorToast} = useContext(DataContext);
    const navigate = useNavigate();

    const title = itemTitle ? itemTitle.split(" - ")[1] + " - " + itemTitle.split(" - ")[3] + " | " + AppName : AppName;
    document.title = title;

    const showSwal = () => {
        swal({
            title: "Notice",
            text: "Please log in to save this item",
            icon: "info",
            buttons: ["Not now", "Login"]
        }).then((value) => {
          if(value === true){navigate("/login")}
        });
    }

    useEffect(() => {
        AddToCart({pageContent:pageContent.data, pageIndex:pageIndex, cartItems:cartItems, handleCartItems:handleCartItems, handleCart:handleCart, setPageIndex:setPageIndex, SuccessToast:SuccessToast, Quantity:itemQty, Size:itemSize });
        setItemQty(1);
    }, [pageIndex]);

    useEffect(() => {    
        setPageContent("");
        let load_obj = {
            method: 'get',
            url: `/api/details/${itemSlug}`
            }
        if(user){
            load_obj["headers"] = { 
                "Authorization": `Bearer ${user.token}`,
                "token": user.token
            };
            load_obj["url"] = `/api/users-details/${itemSlug}`;
        }
        axios(load_obj)
        .then(res => {
            setItemTitle(res.data.data.category);
            setPageContent(res.data);
        })
        .catch(err => {
            ErrorToast(err.response.data.message);
        });

    }, [itemSlug]);
     
    return (
    <div className="home-body-wrapper">
    <div className="container" style={{maxWidth:"1200px"}}>

    {pageContent ?
    <>
    <div className="margin-top-down-20"><Link to={`/cat/${itemTitle.split(" - ")[2]}/${pageNo}`} className="btn gen-btn"><FaArrowLeft /> {`${itemTitle.split(" - ")[0]} - ${itemTitle.split(" - ")[1]}`} category</Link></div>

    {Object.keys(pageContent.data).length > 1 ?
    <>
    {pageContent.data.details &&  Object.keys(pageContent.data.details).length > 0 ?
    <ItemDetails item={pageContent.data.details} key="details" user={user} setPageIndex={setPageIndex} setItemSize={setItemSize} itemQty={itemQty} setItemQty={setItemQty} showSwal={showSwal} />
    : ""
    }
    {pageContent.data[0] ?
    <>
    <h1 className="body-header border-radius" style={{marginTop: "20px", background: "#fbfbfb"}}>Related <span>Products</span></h1>
    <div className="item-wrapper">
    {Object.keys(pageContent.data).map((index) => { 
        return <ItemGrids item={pageContent.data[index]} user={user} index={index} key={index} setPageIndex={setPageIndex} showSwal={showSwal} pn={pageNo} />
    })}
    </div>
    </>
    : ""
    }
    </>
    : ""
    }
    </>
    : <p className="align-center" style={{paddingTop:"20px"}}><FaSpinner className="fa-spin" style={{fontSize:"25px"}} /></p> }

    </div>
    </div>
    );
};
export default Details;