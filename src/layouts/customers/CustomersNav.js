import React, {useContext} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { FaUser, FaShoppingCart, FaHeart, FaBullhorn, FaListUl, FaInbox, FaPaperPlane, FaLock, FaSignOutAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import DataContext from '../../context/DataContext';
import swal from 'sweetalert';

const CustomersNav = () => {

    const {user} = useContext(DataContext);
    const navigate = useNavigate();

    const showSwal = () => {
        swal({
            title: "Logout Confirmation",
            text: "Are you sure you want to logout?",
            icon: "info",
            buttons: ["No", "Yes"]
          }).then((value) => {
            if(value === true){navigate("/logout")}
          });
    }

    return (

        <div class="portal-nav portal-content">
        <NavLink strict activeclassname="true" className="main-link" to="/customers"><MdSpaceDashboard /> My Dashboard</NavLink>
        {user && user.admin ?
        <NavLink className="main-link" to="/aeadmin"><FaUser /> Admin Portal</NavLink>
        :""
        }
        <NavLink activeclassname="true" className="main-link" to="/customers/manage-orders"><FaShoppingCart /> Manage Orders</NavLink>
        <NavLink activeclassname="true" className="main-link" to="/customers/saved-items"><FaHeart /> Saved Items</NavLink>
        <NavLink activeclassname="true" className="main-link" to="/customers/payment-notifications"><FaBullhorn /> Payment Notes</NavLink>
        <NavLink activeclassname="true" className="main-link" to="/customers/transaction-log"><FaListUl /> Transaction Log</NavLink>
        <NavLink activeclassname="true" className="main-link" to="/customers/inbox"><FaInbox /> Inbox</NavLink>
        <NavLink activeclassname="true" className="main-link" to="/customers/sent-messages"><FaPaperPlane /> Sent Messages</NavLink>
        <NavLink activeclassname="true" className="main-link" to="/customers/profile"><FaUser /> Profile</NavLink>
        <NavLink activeclassname="true" className="main-link" to="/customers/reset-password"><FaLock /> Reset Password</NavLink>
        <Link onClick={()=>showSwal()} className="main-link"><FaSignOutAlt /> Log Out</Link>
        </div>

    );
};
export default CustomersNav;