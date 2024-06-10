import React from "react";
import {Outlet} from "react-router-dom";

import {AdminHeader, AdminNav, AdminFooter} from './AdminLoader';

const AdminLayout = () => {

    return (<>
    <AdminHeader />
    
    <Outlet />
    <AdminFooter /> 
    </>)
}

export default AdminLayout;