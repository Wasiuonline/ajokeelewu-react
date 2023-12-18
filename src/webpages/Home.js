import React, {useContext, useState, useEffect} from 'react';
import DataContext from '../context/DataContext';
import axios from '../api/axios';
import {useNavigate} from "react-router-dom";

//import useAxiosFetch from '../hooks/useAxiosFetch';
//import api from '../api/post'; , {useContext, useEffect, useState}
const Home = () => {
    const [homeContent, setHomeContent] = useState("");
    const navigate = useNavigate();
    const {ErrorMsg, handleLogout} = useContext(DataContext);

    useEffect(() => {
        axios({
        method: 'get',
        url: "/api/home-items"
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
            // const outcome = ErrorMsg({err:err});
            // console.log(outcome);
            // if(outcome === 1){
            //     handleLogout("Please log in to continue.");
            //     navigate("/login");
            // }else{
            // return outcome;
            // }
        });

    }, []);
        
    return (
    <div className="home-body-wrapper">
    <div className="container" style={{maxWidth:"1200px"}}>

    <div id="amazingslider-wrapper-1" style={{display:"block", position:"relative", maxWidth:"1200px", margin:"0px auto 10px", maxHeight:"600px"}}>
    <div id="amazingslider-1" style={{display:"block", position:"relative", margin:"0 auto"}}>
    <ul className="amazingslider-slides" style={{listStyle:"none"}}> 
    <li><img src="images/slides/slide-1.jpg" alt="Domestic Cleaning" /></li>
    <li><img src="images/slides/slide-2.jpg" alt="Office Cleaning" /></li>
    <li><img src="images/slides/slide-3.jpg" alt="Window Cleaning" /></li>
    </ul>
    </div>
    </div>



    </div>
    </div>
    );
};
export default Home;