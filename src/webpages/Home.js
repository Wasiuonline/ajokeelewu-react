import React, {useContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import DataContext from '../context/DataContext';
import axios from '../api/axios';
import ItemGrids from '../components/ItemGrids';
import { FaSpinner } from "react-icons/fa";
import { AppName } from '../components/General';
import { loadScript, loadStyle } from '../components/LoadFile';
import AddToCart from '../components/AddToCart';
import swal from 'sweetalert';

const Home = () => {
    const [pageContent, setPageContent] = useState("");
    const [pageIndex, setPageIndex] = useState("");
    const {user, cartItems, handleCart, handleCartItems, SuccessToast} = useContext(DataContext);
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
        AddToCart({pageContent:pageContent, pageIndex:pageIndex, cartItems:cartItems, handleCartItems:handleCartItems, handleCart:handleCart, setPageIndex:setPageIndex, SuccessToast:SuccessToast, Quantity:1 });
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
            console.log(err);
        });

    }, [user]);

    loadScript("sliderengine/amazingslider.js");
    loadStyle("sliderengine/amazingslider.css");
    loadScript("sliderengine/initslider.js");
        
    return (
    <div className="page-body-wrapper">
    <div className="container" style={{maxWidth:"1200px"}}>

    <div id="amazingslider-wrapper-1" style={{display:"block", position:"relative", maxWidth:"1200px", margin:"0px auto 10px", maxHeight:"600px"}}>
    <div id="amazingslider-1" style={{display:"block", position:"relative", margin:"0 auto"}}>
    <ul className="amazingslider-slides" style={{listStyle:"none"}}> 
    <li><img src="images/slides/slide-1.jpg" alt="Domestic Cleaning" /></li>
    <li><img src="images/slides/slide-2.jpg" alt="Office Cleaning" /></li>
    <li><img src="images/slides/slide-3.jpg" alt="Window Cleaning" /></li>
    </ul>
    </div>
    </div>

    {pageContent ?
    <>
    <h1 className="body-header">Latest <span>in Stock</span></h1>
    <div className="item-wrapper">
    {Object.keys(pageContent).map((index) => { 
       return <ItemGrids item={pageContent[index]} user={user} index={index} key={index} setPageIndex={setPageIndex} showSwal={showSwal} />
    })}
    </div>
    </>
    : <p className="align-center" style={{paddingTop:"20px"}}><FaSpinner className="fa-spin" style={{fontSize:"25px"}} /></p> }

    </div>
    </div>
    );
};
export default Home;