import React from "react";
import { Outlet } from "react-router-dom";
import {Header, Nav, Footer} from './FrontEndLoader';

const FrontEndLayout = () => {
    return (<>
    <Header />
    <Nav />
    <Outlet />
    <Footer /> 
    </>)
}

export default FrontEndLayout;