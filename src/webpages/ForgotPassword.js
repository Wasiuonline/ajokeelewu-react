import React, {useState, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { FaEnvelope, FaRegEnvelope, FaSpinner } from "react-icons/fa";
import axios from '../api/axios';
import DataContext from '../context/DataContext';
 
const ForgotPassword = () => {
    const [resetRotate, setResetRotate] = useState(false);
    const [forgotError, setForgotError] = useState("");
    const [forgotEmail, setForgotEmail] = useState("");
    const navigate = useNavigate();
    const {user, handleLoginNotice, ErrorMsg} = useContext(DataContext);
    if(user){
        navigate("/");
    }

    const handleForgot = async (e) => {
        e.preventDefault();
        setResetRotate(true);
        setForgotError("");
        handleLoginNotice("");

        axios({
            method: 'post',
            url: "/forgot-password",
            data: {email:forgotEmail},
        })
        .then(res => {
            setResetRotate(false);
            setForgotEmail("");
            handleLoginNotice("Please check your mail for the next action.");
            navigate("/login");
        })
        .catch(err => {
            setResetRotate(false);
            setForgotError(<ErrorMsg err={err} />);
        })
    }

    return (
        <div className="home-body-wrapper"> 
        <div className="container">

        <div className="col-sm-3">
        </div>
        <div className="col-sm-6">

        <form className="forgot-form" onSubmit={handleForgot}>  
        <fieldset className="border-radius"><legend>Forgot Password</legend>
        <p>Don't worry yourself if you forgot your password. Please supply your email address below. We will send to you a password reset link that will allow you to choose a new one.</p>

        {forgotError && <p className="required">{forgotError}</p>}

        <div>
        <label htmlFor="forgotEmail">Email<span className="required">*</span></label>
        <div className="form-group input-group">
        <span className="input-group-addon"><FaRegEnvelope /></span>
        <input type="email" name="forgotEmail" id="forgotEmail" className="form-control" placeholder="Your Username" required value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
        </div>
        </div>
                        
        <div>
        <Link to="/login" className="form-link" style={{color:"#b20"}}>Login</Link>
        <button className="gen-btn float-right" disabled = {resetRotate?true:false}>{resetRotate?<FaSpinner className="fa-spin" />:<FaEnvelope />} Send Password Reset Link</button>
        </div>
        </fieldset>
        </form>

        </div>
        </div>
        </div>
    );
};
export default ForgotPassword;