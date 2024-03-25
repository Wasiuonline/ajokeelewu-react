import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { FaSpinner, FaRegMoneyBillAlt } from "react-icons/fa";
import axios from '../api/axios';
import DataContext from '../context/DataContext';
import PreviewPageItems from '../components/PreviewPageItems';
import { AppName, AppCurr, FormatNumber, UsableNumber } from '../components/General';
import {decode} from 'html-entities';
import "../css/preview.css";

const Preview = () => {
    const [payment, setPayment] = useState("");
    const [loginConfirmation, setLoginConfirmation] = useState(false);
    const [tempError, setTempError] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    const navigate = useNavigate();

    const {user, categories, cartItems, checkout, handleLogout, handlePrevURL} = useContext(DataContext);

    const title = "Cart Preview | " + AppName;
    document.title = title;

    if(checkout==="" || cartItems==="" || categories===""){
        navigate("/checkout");
    }

    useEffect(() => {

    let load_obj = {
        method: "get",
        url: "/api/user"
        }
    if(user){
        load_obj["headers"] = { 
            "Authorization": `Bearer ${user.token}`,
            "token": user.token
        };
    }
    axios(load_obj)
    .then(res => {
        setLoginConfirmation(true);
    })
    .catch(err => {
        if(err.response.data.message === "Unauthenticated." || err.response.data.message === "Unauthorized"){
            handlePrevURL("/preview");
            handleLogout("Please login to continue...");
            navigate("/login");
        }else{
        setTempError(true);
        }
    })
    }, [pageIndex]);

    let grand_total = 0;
    let delivery = UsableNumber(checkout.delivery);
    let delivery_amount = UsableNumber(categories.delivery[delivery].price);
    let country = UsableNumber(checkout.country);
    country = categories.countries[country].country;

    return (
    <div className="home-body-wrapper"> 
    <div className="container">
    
    <h1 className="body-header">Cart <span>Preview</span></h1>

    {cartItems ?

    <>
    <div className="auto-scroll border-radius-bottom">
        
    <table className="cart-table table-striped table-hover">
    <thead><tr>
    <th style={{width:"150px"}}></th>
    <th>Description</th>
    <th className="align-center" style={{width:"70px"}}>Amount({decode(AppCurr)})</th>
    </tr></thead>
    <tbody>
    
    {Object.keys(cartItems).sort().map((index) => { 
    grand_total += UsableNumber(cartItems[index].item_price) * cartItems[index].selected_qty
    return <PreviewPageItems item={cartItems[index]} key={index} />
    })}

    {delivery_amount?
    <>

    <tr>
    <td className="align-right" colSpan="2" style={{fontWeight:"900"}}>{checkout.delivery === "0" && "Sub-"}Total({decode(AppCurr)})</td>
    <th className="align-right">{FormatNumber(grand_total)}</th>
    </tr>
   
    <tr>
    <td className="align-right" colSpan="2">Delivery Charges({decode(AppCurr)})</td>
    <td className="align-right">{FormatNumber(delivery_amount)}</td>
    </tr>
    <tr>
    <td className="align-right" colSpan="2" style={{fontWeight:"900"}}>Grand Total({decode(AppCurr)})</td>
    <th className="align-right">{FormatNumber(grand_total + delivery_amount)}</th>
    </tr>

    </>
    : ""}

    </tbody></table>
    </div>

    <form method="post">  
    <div className="col-md-8" style={{padding:"0px"}}>
    <table className="table preview-table">
    <tr>
    <td><b>Full Name:</b> {checkout.name}</td>
    <td><b>Email:</b> {checkout.email}</td>
    </tr>
    <tr>
    <td colSpan="2"><b>Delivery Address:</b> {checkout.address}{", " + country}</td>
    </tr>
    <tr>
    <td><b>Phone:</b> {checkout.phone}</td>
    <td><b>Delivery Option:</b> {categories.delivery[delivery].delivery_option}</td>
    </tr>
    <tr>
    <td colSpan="2"><b>Additional Note:</b> {checkout.note}</td>
    </tr>
    </table>
    </div>
    <div className="col-md-4" style={{padding:"0px"}}>

    <h3 style={{marginTop:"0px"}}>Select a Payment Option<span className="required">*</span></h3>

    {Object.keys(categories.payment_options).map((index) => { 
    return <div className="form-group"><label style={{fontSize:"16px"}}><input type="radio" value={index} key={index} onChange={(e) => setPayment(e.target.value)} checked={delivery===`${index}`} required /> {categories.payment_options[index].payment_option}</label></div>
    })}

    </div>

    <div className="col-sm-12" style={{padding:"0px"}}>
    <Link to="/checkout" className="gen-btn float-left">Checkout</Link>
    {loginConfirmation ? <button type="submit" className="btn gen-btn float-right"><FaRegMoneyBillAlt /> Place Order</button> : tempError ? <Link onClick={()=>{setTempError(false); setPageIndex(pageIndex + 1);}} className="gen-btn float-right">Reload</Link> : <FaSpinner className="fa-spin float-right" />}
    </div>
    </form>
    </>

    : <><h2 className="align-center">Your cart is empty.</h2><p className="align-center"><Link className="gen-btn" to="/cat/all">Continue shopping</Link></p></>

    }
    </div>
    </div>
    );

};
export default Preview;