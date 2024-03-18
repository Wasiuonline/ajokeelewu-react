import React, {useContext, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import DataContext from '../context/DataContext';
import CartPageItems from '../components/CartPageItems';
import { AppName, AppCurr, FormatNumber, UsableNumber } from '../components/General';
import {decode} from 'html-entities';
import "../css/cart.css";

const Cart = () => {
    const [pageIndex, setPageIndex] = useState("");

    const {cartItems, handleCart, handleCartItems, SuccessToast} = useContext(DataContext);

    const title = "Cart Items | " + AppName;
    document.title = title;

    let grand_total = 0;

    const handleClearCart = () => {
    handleCartItems("");
    handleCart(0); 
    };

    useEffect(() => {

    if(pageIndex){
    const get_size = UsableNumber(document.getElementById(`${pageIndex}_size`).selectedIndex);
    let get_qty = parseInt(document.getElementById(`${pageIndex}_qty`).value);
    get_qty = get_qty > 0 ? UsableNumber(get_qty) : 0;
    
    let index_id = parseInt(pageIndex.split("_")[0]);
    let index_size = parseInt(pageIndex.split("_")[1]);
    let updated_items = cartItems;

    if(index_size !== get_size){
    let det_index = `${index_id}_${get_size}`;
    get_qty = updated_items[det_index] ? updated_items[det_index].selected_qty + get_qty : get_qty;
    updated_items = updated_items[det_index] ? {...updated_items, [det_index]: {...updated_items[det_index],selected_size:get_size, selected_qty:get_qty}} : {...updated_items, [det_index]: {...updated_items[pageIndex],selected_size:get_size, selected_qty:get_qty}};
    delete updated_items[pageIndex];
    }else{
    updated_items = {...updated_items, [pageIndex]: {...updated_items[pageIndex],selected_size:get_size, selected_qty:get_qty}}
    }

    if(get_qty === 0){
    delete updated_items[pageIndex];
    }

    let updated_items_count = 0;
    Object.values(updated_items).map(value => { 
    updated_items_count += value.selected_qty;
    });
    handleCartItems(updated_items);
    handleCart(updated_items_count); 
    setPageIndex("");
    SuccessToast(<><b style={{color:"#fff"}}>{updated_items_count}</b> &nbsp; item(s). &nbsp; <Link to="/cart" className='border-radius' style={{color:"#fff", background:"#f33", padding:"2px 7px", fontSize:"12px"}}>View cart</Link> </>);
    }

    }, [pageIndex]);

    return (
    <div className="home-body-wrapper"> 
    <div className="container cart-result auto-scroll padding-20"> 

    {cartItems ?

    <>
    <div className="auto-scroll">
    <table className="cart-table table-striped table-hover">
    <thead><tr>
    <th style={{minWidth:"80px"}}>Description</th>
    <th className="align-center" style={{minWidth:"120px"}}>Size</th>
    <th className="align-center">Qty</th>
    </tr></thead>
    <tbody>
    
    {Object.keys(cartItems).sort().map((index) => { 
    grand_total += UsableNumber(cartItems[index].item_price) * cartItems[index].selected_qty
    return <CartPageItems item={cartItems[index]} key={index} index={index} setPageIndex={setPageIndex} />
    })}
   
    <tr>
    <td colSpan="2"><b className="float-right" style={{color:"#b20"}}>Total</b> Type zero or leave the textbox blank to remove an item</td>
    <th className="align-right">{decode(AppCurr)}{FormatNumber(grand_total)}</th>
    </tr>
    </tbody></table>
    </div>

    <div><Link className="gen-btn float-left" onClick={()=>handleClearCart()}>Clear cart</Link><Link className="gen-btn float-right" to="/checkout">Checkout</Link></div>
    </>

    : <><h2 className="align-center">Your cart is empty.</h2><p className="align-center"><Link className="gen-btn" to="/cat/all">Continue shopping</Link></p></>

    }
    </div>
    </div>
    );

};
export default Cart;