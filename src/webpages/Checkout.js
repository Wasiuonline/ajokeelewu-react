import React, {useState, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import DataContext from '../context/DataContext';
import { FaMapMarkerAlt, FaUser, FaRegEnvelope, FaPhone, FaEye, FaPencilAlt, FaFileAlt } from "react-icons/fa";
import { AppName, AppCurr, FormatNumber } from '../components/General';
import {decode} from 'html-entities';

const Checkout = () => {

    const title = "Checkout | " + AppName;
    document.title = title;

    const {categories, cartItems, checkout, handleCheckout} = useContext(DataContext);
    const [name, setName] = useState(checkout.name || "");
    const [phone, setPhone] = useState(checkout.phone || "");
    const [email, setEmail] = useState(checkout.email || "");
    const [country, setCountry] = useState(checkout.country || 0);
    const [address, setAddress] = useState(checkout.address || "");
    const [note, setNote] = useState(checkout.note || "");
    const [delivery, setDelivery] = useState(checkout.delivery || "");
    const navigate = useNavigate();
    if(cartItems==="" || categories===""){
        navigate("/cat/all");
    }

    const handleSubmitCheckout = async (e) => {
        e.preventDefault();
        if(name && phone && email && address){
        let data = {name:name, phone:phone, email:email, country:country, address:address, note:note, delivery:delivery};
        handleCheckout(data);
        navigate("/preview");
        }
    }

    if(cartItems && categories){

    return (

    <div className="home-body-wrapper"> 
    <div className="container">
    
    <form method="post" onSubmit={handleSubmitCheckout}>  

    <div className="col-md-7">
    
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
    <span className="input-group-addon"><FaMapMarkerAlt /></span>
    <select id="country" name="country" className="form-control js-example-basic-single" required onChange={(e) => setCountry(e.target.value)} defaultValue={country}>
    {Object.keys(categories.countries).map((index) => { 
    return <option value={index} key={index}>{categories.countries[index].country}</option>
    })}
    </select>
    </div>
    
    <label htmlFor="address">Full Address<span className="required">*</span></label>
    <div className="form-group input-group">
    <span className="input-group-addon"><FaMapMarkerAlt /></span>
    <textarea name="address" id="address" className="form-control" rows="2" placeholder="Your Contact Address" defaultValue={address} required onChange={(e) => setAddress(e.target.value)}></textarea>
    </div>
    
    <label htmlFor="note">Additional Note</label>
    <div className="form-group input-group">
    <span className="input-group-addon"><FaFileAlt /></span>
    <textarea name="note" id="note" className="form-control" rows="2" placeholder="Additional note to the order" defaultValue={note} onChange={(e) => setNote(e.target.value)}></textarea>
    </div>
    
    </div>
    <div className="col-md-5">
    
    <h3 style={{marginTop:"0px"}}>DELIVERY OPTION<span className="required">*</span></h3>
    <div className="form-group">
    {Object.keys(categories.delivery).map((index) => { 
    return <label style={{display:"block"}}><input type="radio" value={index} key={index} onChange={(e) => setDelivery(e.target.value)} checked={delivery===`${index}`} /> {categories.delivery[index].delivery_option}{categories.delivery[index].price !== "0" ? " - " + decode(AppCurr) + "" + FormatNumber(categories.delivery[index].price) : index === "1" ? " - Will be communicated" : ""}</label>
    })}
    </div>
    
    <div>
    <Link to="/cart" className="btn gen-btn float-left"><FaPencilAlt /> Edit cart</Link>
    <button type="submit" className="btn gen-btn float-right"><FaEye /> Preview Order</button>
    </div>
    
    </div>
    
    </form>
    
    </div>
    </div>

    );
    }
};

export default Checkout;