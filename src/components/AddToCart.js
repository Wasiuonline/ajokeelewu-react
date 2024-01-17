import React from 'react';
import {Link} from "react-router-dom";

const AddToCart = ({ pageContent, pageIndex, cartItems, handleCartItems, handleCart, setPageIndex, SuccessToast, Quantity }) => {
    if(pageContent !== "" && pageIndex !== ""){
        const key = pageIndex;
        let val = pageContent[key];
        let qty = (cartItems !== "" && val.item_id in cartItems)?cartItems[val.item_id].selected_qty:0;
        val = {...val, selected_qty: qty + Quantity};
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
        SuccessToast(<><b style={{color:"#fff"}}>{updated_items_count}</b> &nbsp; item(s). &nbsp; <Link to="/cart" className='border-radius' style={{color:"#fff", background:"#f33", padding:"2px 7px", fontSize:"12px"}}>View cart</Link> </>);
    }
}

export default AddToCart
