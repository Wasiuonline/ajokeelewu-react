import React, {useContext, useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import DataContext from '../context/DataContext';
import axios from '../api/axios';
import ItemGrids from '../components/ItemGrids';
import { FaSpinner } from "react-icons/fa";
import { AppName } from '../components/General';
import Pagination from '../components/Pagination';

const Cat = () => {
    const {catSlug} = useParams();
    const [homeContent, setHomeContent] = useState("");
    const [homeIndex, setHomeIndex] = useState("");
    const [catTitle, setCatTitle] = useState("");
    const [param, setParam] = useState("");
    const [paramLoader, setParamLoader] = useState(false);
    const {user, cartItems, handleCart, handleCartItems} = useContext(DataContext);
    const title = catTitle + " | " + AppName;
    document.title = title;

    useEffect(() => {
        if(homeContent !== "" && homeIndex !== ""){
        const key = homeIndex;
        let val = homeContent[key];
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
        setHomeIndex("");
        }
    }, [homeIndex]);

    useEffect(() => {
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
            console.log(res.data);
            setHomeContent(res.data);
        })
        .catch(err => {
            console.log(err);
        });

    }, [param]);
        
    return (
    <div className="home-body-wrapper">
    <div className="container" style={{maxWidth:"1200px"}}>

    {homeContent ?
    <>
    <h1 className="body-header">Latest <span>in Stock</span></h1>
    <div className="item-wrapper">
    {Object.values(homeContent.data).map((value, index) => { 
       return <ItemGrids item={value} user={user} index={index} key={index} setHomeIndex={setHomeIndex} />
    })}
    </div>
    {homeContent.last_page > 1 ?
    <Pagination links={homeContent.links} setParam={setParam} paramLoader={paramLoader} />
    : ""}
    </>
    : <p className="align-center" style={{paddingTop:"20px"}}><FaSpinner className="fa-spin" style={{fontSize:"25px"}} /></p> }

    </div>
    </div>
    );
};
export default Cat;