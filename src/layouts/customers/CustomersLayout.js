import React from "react";
import {Outlet} from "react-router-dom";

import {CustomersHeader, CustomersNav, CustomersFooter} from './CustomersLoader';

const CustomersLayout = () => {

    return (<>
    <CustomersHeader />
    <CustomersNav />
    <Outlet />
    <CustomersFooter /> 
    </>)
}

export default CustomersLayout;