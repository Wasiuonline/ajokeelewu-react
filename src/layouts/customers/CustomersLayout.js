import React from "react";
import {Outlet} from "react-router-dom";

import {CustomersNav} from './CustomersLoader';

const CustomersLayout = () => {

    return (
    <div class="portal-wrapper">

    <CustomersNav />
    
    <div class="portal-body portal-content">
    {/* <div class="<?php echo (basename($_SERVER["PHP_SELF"],".php") == "index")?"portal-body-wrapper":"body-content form-div"; ?>"> */}

    <Outlet />

    </div>
    
    </div>
    )
    
}

export default CustomersLayout;