import React from "react";
import {Home, About, Contact, Login, Register, Logout, ForgotPassword, Missing} from '../layouts/frontend/FrontEndLoader';
import FrontEndLayout from "../layouts/frontend/FrontEndLayout";
import {Dashboard} from '../layouts/customers/CustomersLoader';
import CustomersLayout from "../layouts/customers/CustomersLayout";


import {Route, Routes} from "react-router-dom";

const WebRoute = () => {
    return(
        
        <Routes>
        <Route element={<CustomersLayout />}>
        <Route exact path = "/customers" element = {<Dashboard />} />
        </Route>
        <Route element={<FrontEndLayout />}>
        <Route exact index element = {<Home />} />
        <Route exact path = "/about" element = {<About />} />
        <Route exact path = "/contact" element = {<Contact />} />
        <Route exact path = "/login" element = {<Login />} />
        <Route exact path = "/register" element = {<Register />} />
        <Route exact path = "/logout" element = {<Logout />} />
        <Route exact path = "/forgot-password" element = {<ForgotPassword />} />
        <Route path = "*" element = {<Missing />} />
        </Route>
        </Routes>        
       
        );
}

export default WebRoute;