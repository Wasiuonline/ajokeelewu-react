import React, {useContext, useState, useEffect} from 'react';
import DataContext from '../context/DataContext';
import axios from '../api/axios';
import ItemGrids from '../components/ItemGrids';
import { FaSpinner } from "react-icons/fa";
import { AppName } from '../components/General';

const Home = () => {
    const [pageContent, setPageContent] = useState("");
    const [pageIndex, setPageIndex] = useState("");
    const {user, cartItems, handleCart, handleCartItems} = useContext(DataContext);
    const title = "Home | " + AppName;
    document.title = title;

    useEffect(() => {
        if(pageContent !== "" && pageIndex !== ""){
        const key = pageIndex;
        let val = pageContent[key];
        let qty = (cartItems !== "" && val.item_id in cartItems)?cartItems[val.item_id].selected_qty:0;
        val = {...val, selected_qty: qty + 1};
        val = (val.sizes && Object.keys(val.sizes).length > 0)?{...val, selected_size:0}:val; 

        const item_id = val.item_id;
        const updated_items = (cartItems !== "")?{...cartItems, [item_id]:val}: {[item_id]:val};
        let updated_items_count = 0;
        Object.values(updated_items).map(value => { 
        updated_items_count += value.selected_qty;
        });
        handleCartItems(updated_items);
        handleCart(updated_items_count); 
        setPageIndex("");
        }
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
    {Object.values(pageContent).map((value, index) => { 
       return <ItemGrids item={value} user={user} index={index} key={index} setPageIndex={setPageIndex} />
    })}
    </div>
    </>
    : <p className="align-center" style={{paddingTop:"20px"}}><FaSpinner className="fa-spin" style={{fontSize:"25px"}} /></p> }

    </div>
    </div>
    );
};
export default Home;