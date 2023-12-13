import React, {useState, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from '../api/axios';
import DataContext from '../context/DataContext';
import { FaSignInAlt, FaSpinner, FaRegEnvelope, FaLock } from "react-icons/fa";
 
const Login = () => {
    const [loginRotate, setLoginRotate] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {user, handleUserData, loginNotice, handleLoginNotice, ErrorMsg} = useContext(DataContext);
    if(user){
        navigate("/");
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginRotate(true);
        setLoginError("");
        handleLoginNotice("");

        axios({
            method: 'post',
            url: "/login",
            data: {email, password},
        })
            .then(res => {
                // listarChamados.innerHTML = res.data;
                setLoginRotate(false);
                const data = {id: res.data.id, admin: res.data.admin, token: res.data.token}
                localStorage.setItem("login", JSON.stringify(data));
                handleUserData();
                setEmail("");
                setPassword("");
                setLoginError("");
            })
            .catch(err => {
                setLoginRotate(false);
                setLoginError(<ErrorMsg err={err} />);
            })
    }

    return (
        <div className="home-body-wrapper"> 
        <div className="container">

        <div className="col-sm-3">
        </div>
        <div className="col-sm-6">

        {loginNotice ? 
        <div className="success">{loginNotice}</div>
        :""
        }

        <form className="login-form" onSubmit={handleLogin}>  
        <fieldset className="border-radius"><legend>Login</legend>

        <div>
        <label htmlFor="email">Email<span className="required">*</span></label>
        <div className="form-group input-group">
        <span className="input-group-addon"><FaRegEnvelope /></span>
        <input type="email" name="email" id="email" className="form-control" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        </div>
        {loginError && <p className="required">{loginError}</p>}
        <div>
        <label htmlFor="password">Password<span className="required">*</span></label>
        <div className="form-group input-group">
        <span className="input-group-addon"><FaLock /></span>
        <input type="password" name="password" id="password" className="form-control" placeholder="Your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        </div>
                            
        <div>
        <Link to="/forgot-password" className="form-link" style={{color:"#b20"}}>Forgot Password?</Link>
        <button className="gen-btn float-right" disabled = {loginRotate?true:false}>{loginRotate?<FaSpinner className="fa-spin" />:<FaSignInAlt />} Login</button>
        </div>

        <Link to="/register" style={{color:"#090", fontWeight:"900"}} className="form-link">If not registered, kindly click here.</Link>
        </fieldset>
        </form>

        </div>
        </div>
        </div>
    );
};
export default Login;