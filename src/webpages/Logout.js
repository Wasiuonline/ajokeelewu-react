import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import DataContext from '../context/DataContext';
import axios from '../api/axios';

const Logout = () => {
    const navigate = useNavigate();
    const {user, handleLogout} = useContext(DataContext);

    if(user){

    axios({
        method: 'post',
        url: "/api/logout",
        headers: { 
        "Authorization": `Bearer ${user.token}`,
        "token": user.token
        },
        data: {id:user.id},
    })
    .then(res => {
        if(res.data.logout){
        handleLogout("You are successfully logged out");
        navigate("/login");
        }
    })
    .catch(err => {
        handleLogout("You are successfully logged out");
        navigate("/login");
    });

    }else{
    navigate("/login");
    }

    return (
        <div className="required align-center" style={{minHeight:"400px", fontSize:"18px", paddingTop:"100px"}}>Please wait...</div>
    )
  
}

export default Logout;