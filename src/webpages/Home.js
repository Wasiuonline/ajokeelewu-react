import React, {useContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import DataContext from '../context/DataContext';
import axios from '../api/axios';
import ItemGrids from '../components/ItemGrids';
import { FaSpinner } from "react-icons/fa";
import { AppName } from '../components/General';
import AddToCart from '../components/AddToCart';
import HomeSlides from '../components/HomeSlides';
import swal from 'sweetalert';

const Home = () => {
    const [pageContent, setPageContent] = useState("");
    const [pageIndex, setPageIndex] = useState("");
    const {user, cartItems, handleCart, handleCartItems, SuccessToast, ErrorToast} = useContext(DataContext);
    const navigate = useNavigate();

    const title = "Home | " + AppName;
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
        AddToCart({pageContent:pageContent, pageIndex:pageIndex, cartItems:cartItems, handleCartItems:handleCartItems, handleCart:handleCart, setPageIndex:setPageIndex, SuccessToast:SuccessToast, Quantity:1, Size:0 });
    }, [pageIndex]);

    useEffect(() => {
        let load_obj = {
            method: 'get',
            url: "/api/home-items"
            }
        if(user){
            load_obj["headers"] = { 
                "Authorization": `Bearer ${user.token}`,
                "token": user.token
            };
            load_obj["url"] = "/api/users-home-items";
        }
        axios(load_obj)
        .then(res => {
            setPageContent(res.data);
        })
        .catch(err => {
            ErrorToast(err.response.data.message);
        });

    }, [user]);
        
    return (
    <div className="page-body-wrapper">
    <div className="container" style={{maxWidth:"1200px"}}>

    <HomeSlides />

    {pageContent ?
    <>
    <h1 className="body-header">Latest <span>in Stock</span></h1>
    <div className="item-wrapper">
    {Object.keys(pageContent).map((index) => { 
       return <ItemGrids item={pageContent[index]} user={user} index={index} key={index} setPageIndex={setPageIndex} showSwal={showSwal} pn={1} />
    })}
    </div>
    </>
    : <p className="align-center" style={{paddingTop:"20px"}}><FaSpinner className="fa-spin" style={{fontSize:"25px"}} /></p> }

    </div>
    </div>
    );
};
export default Home;