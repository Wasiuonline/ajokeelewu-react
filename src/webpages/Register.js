import React, {useState, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from '../api/axios';
import DataContext from '../context/DataContext';
import { FaLaptop, FaSpinner, FaUser, FaRegEnvelope, FaLock } from "react-icons/fa";
 
const Register = () => {
    const [registerRotate, setRegisterRotate] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();
    const {user, handleUserData, ErrorMsg} = useContext(DataContext);
    if(user){
        navigate("/");
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterRotate(true);
        setRegisterError("");

        axios({
            method: 'post',
            url: "/register",
            data: {name, email, password, password_confirmation},
        })
            .then(res => {
                // listarChamados.innerHTML = res.data;
                setRegisterRotate(false);
                const data = {id: res.data.id, admin: res.data.admin, token: res.data.token}
                localStorage.setItem("login", JSON.stringify(data));
                handleUserData();
                setName("");
                setEmail("");
                setPassword("");
                setPasswordConfirmation("");
                setRegisterError("");
            })
            .catch(err => {
                setRegisterRotate(false);
                setRegisterError(<ErrorMsg err={err} />);
            })
    }

    return (
        <div className="home-body-wrapper"> 
        <div className="container">

        <div className="col-sm-3">
        </div>
        <div className="col-sm-6">

        <form className="login-form" onSubmit={handleRegister}>  
        <fieldset className="border-radius"><legend>Register</legend>

        {registerError && <p className="required">{registerError}</p>}

        <div>
        <label htmlFor="name">Name<span className="required">*</span></label>
        <div className="form-group input-group">
        <span className="input-group-addon"><FaUser /></span>
        <input type="name" name="name" id="name" className="form-control" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        </div>

        <div>
        <label htmlFor="email">Email<span className="required">*</span></label>
        <div className="form-group input-group">
        <span className="input-group-addon"><FaRegEnvelope /></span>
        <input type="email" name="email" id="email" className="form-control" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        </div>

        <div>
        <label htmlFor="password">Password<span className="required">*</span></label>
        <div className="form-group input-group">
        <span className="input-group-addon"><FaLock /></span>
        <input type="password" name="password" id="password" className="form-control" placeholder="Your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        </div>

        <div>
        <label htmlFor="password_confirmation">Retype Password<span className="required">*</span></label>
        <div className="form-group input-group">
        <span className="input-group-addon"><FaLock /></span>
        <input type="password" name="password_confirmation" id="password_confirmation" className="form-control" placeholder="Re-type your password" required value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </div>
        </div>
                            
        <div>
        <button className="gen-btn float-right" disabled = {registerRotate?true:false}>{registerRotate?<FaSpinner className="fa-spin" />:<FaLaptop />} Register</button>
        </div>

        <Link to="/login" style={{color:"#090", fontWeight:"900"}} className="form-link">Already registered? Log in here.</Link>
        </fieldset>
        </form>

        </div>
        </div>
        </div>
    );
};
export default Register;