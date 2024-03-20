import React, {useState, useContext, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from '../api/axios';
import DataContext from '../context/DataContext';
import { faLocationDot, FaSpinner, FaUser, FaRegEnvelope, FaPhone, FaEye, FaPencilAlt} from "react-icons/fa";
import { AppName, AppCurr, FormatNumber } from '../components/General';
import {decode} from 'html-entities';

const Checkout = () => {

    const title = "Checkout | " + AppName;
    document.title = title;

    const {categories, cartItems, checkout, handleCheckout, handleLogout} = useContext(DataContext);
    const [loginConfirmation, setLoginConfirmation] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState(0);
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [delivery, setDelivery] = useState("");
    const navigate = useNavigate();
    if(!cartItems){
        navigate("/cat/all");
    }

    useEffect(() => {
        axios({
            method: "get",
            url: "/user"
        })
        .then(res => {
            setLoginConfirmation(true);
        })
        .catch(err => {
            handleLogout("Please login to continue...");
            navigate("/login");
        })
    }, []);

    const handleSubmitCheckout = async (e) => {
        e.preventDefault();
        let data = {name:name, phone:phone, email:email, country:country, address:address, note:note, delivery:delivery};
        handleCheckout(data);
        navigate("/preview");
    }

    return (

    <div className="home-body-wrapper"> 
    <div className="container">
    
    <form onSubmit={handleSubmitCheckout}>  

    <div className="col-md-8">
    
    <h3 style={{marginTop:"0px"}}>DELIVERY INFORMATION</h3>
    
    <label htmlFor="name">Full Name<span className="required">*</span></label>
    <div className="form-group input-group">
    <span className="input-group-addon"><FaUser /></span>
    <input type="text" name="name" id="name" className="form-control" placeholder="Your Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    
    <label htmlFor="phone">Phone Number<span className="required">*</span></label>
    <div className="form-group input-group">
    <span className="input-group-addon"><FaPhone /></span>
    <input type="text" name="phone" id="phone" className="form-control only-no" placeholder="Your Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
    
    <label htmlFor="email">Email<span className="required">*</span></label>
    <div className="form-group input-group">
    <span className="input-group-addon"><FaRegEnvelope /></span>    
    <input type="email" name="email" id="email" className="form-control" placeholder="Your E-mail Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    
    <label htmlFor="country">Country<span className="required">*</span></label>
    <div className="form-group input-group">
    <span className="input-group-addon"><faLocationDot /></span>
    <select id="country" name="country" className="form-control js-example-basic-single" required onChange={(e) => setCountry(e.target.value)} defaultValue={country}>
    {Object.keys(categories.countries).map((index) => { 
    return <option value={index} key={index}>{categories.countries[index].size}</option>
    })}
    </select>
    </div>
    
    <label htmlFor="address">Full Address<span className="required">*</span></label>
    <div className="form-group input-group">
    <span className="input-group-addon"><faLocationDot /></span>
    <textarea name="address" id="address" className="form-control" rows="2" placeholder="Your Contact Address" required onChange={(e) => setAddress(e.target.value)}>{address}</textarea>
    </div>
    
    <label htmlFor="note">Additional Note</label>
    <div className="form-group input-group">
    <span className="input-group-addon"><faLocationDot /></span>
    <textarea name="note" id="note" className="form-control" rows="2" placeholder="Additional note to the order" onChange={(e) => setNote(e.target.value)}>{note}</textarea>
    </div>
    
    </div>
    <div className="col-md-4">
    
    <h3 style={{marginTop:"0px"}}>DELIVERY OPTION<span className="required">*</span></h3>
    <div className="form-group">
    {Object.keys(categories.delivery).map((index) => { 
    return <label style={{fontSize:"16px"}} onChange={(e) => setDelivery(e.target.value)}><input type="radio" value={index} key={index} />{categories.delivery[index].delivery_option} - {categories.delivery[index].price !== 0 ? decode(AppCurr) + "" + FormatNumber(categories.delivery[index].price) : "Will be communicated"}</label>
    })}
    </div>
    
    <div>
    <Link to="/cart" className="btn gen-btn float-left"><FaPencilAlt /> Edit cart</Link>
    {loginConfirmation ? <button type="submit" className="btn gen-btn float-right"><FaEye /> Preview Order</button> : <FaSpinner className="fa-spin" />}
    </div>
    
    </div>
    
    </form>
    
    </div>
    </div>

    );
};

export default Checkout;