import React, {useContext, useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import DataContext from '../context/DataContext';
import axios from '../api/axios';
import ItemGrids from '../components/ItemGrids';
import { FaSpinner } from "react-icons/fa";
import { AppName } from '../components/General';
import Pagination from '../components/Pagination';
import AddToCart from '../components/AddToCart';
import swal from 'sweetalert';

const Cat = () => {
    const {catSlug} = useParams();
    const [pageContent, setPageContent] = useState("");
    const [pageIndex, setPageIndex] = useState("");
    const [catTitle, setCatTitle] = useState("");
    const {user, cartItems, handleCart, handleCartItems, param, setParam, SuccessToast} = useContext(DataContext);
    const navigate = useNavigate();

    const title = catTitle + " | " + AppName;
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
        AddToCart({pageContent:pageContent.data, pageIndex:pageIndex, cartItems:cartItems, handleCartItems:handleCartItems, handleCart:handleCart, setPageIndex:setPageIndex, SuccessToast:SuccessToast, Quantity:1 });
    }, [pageIndex]);

    useEffect(() => {
        if(param!==1){
        let load_obj = {
            method: 'get',
            url: param?param:`/api/cat/${catSlug}`
            }
        if(user){
            load_obj["headers"] = { 
                "Authorization": `Bearer ${user.token}`,
                "token": user.token
            };
            load_obj["url"] = param?param:`/api/users-cat/${catSlug}`;
        }
        axios(load_obj)
        .then(res => {
            setCatTitle(res.data.data.category);
            setPageContent(res.data);
            setParam(1);
        })
        .catch(err => {
            console.log(err);
        });

    }}, [param]);
     
    return (
    <div className="home-body-wrapper">
    <div className="container" style={{maxWidth:"1200px"}}>

    {/*createPortal(
          <Link to="/about" onClick={() => Swal.close()}>
            Go to About
          </Link>,
          Swal.getHtmlContainer()
    )*/}

    {pageContent ?
    <>
    <h1 className="body-header">{catTitle.split("-")[0]} <span>{catTitle.split("-")[1]}</span></h1>

    {Object.keys(pageContent.data).length > 1 ?
    <div className="item-wrapper">
    {Object.keys(pageContent.data).map((index) => { 
       return <ItemGrids item={pageContent.data[index]} user={user} index={index} key={index} setPageIndex={setPageIndex} showSwal={showSwal} />
    })}
    </div>
    : <div className='not-success' style={{marginTop:"50px", marginLeft:"auto", marginRight:"auto", maxWidth:"400px"}}>No product available for <b>{`${catTitle}`}</b> now. Please check back later.</div>
    }

    {pageContent.last_page > 1 ?
    <Pagination links={pageContent.links} setParam={setParam} param={param} />
    : ""}
    </>
    : <p className="align-center" style={{paddingTop:"20px"}}><FaSpinner className="fa-spin" style={{fontSize:"25px"}} /></p> }

    </div>
    </div>
    );
};
export default Cat;