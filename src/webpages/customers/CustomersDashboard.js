import React from "react";
import {Link} from "react-router-dom";
import { FaUser, FaShoppingCart, FaInbox, FaLock } from "react-icons/fa";

const CustomersDashboard = () =>{
    return (
    <>
    <div className="page-title">Cusomer's Dashboard</div>
    
    <div className="portal-body-wrapper">

    <div className="home-nav">
    <Link to="/customers/inbox"><div className="body-content body-content2">
    <div className="inner-content">
    <p>Inbox: <b>2</b></p>
    <div className="grey-bg"><div style={{background:"#5cb85c"}}></div></div>
    </div>
    <div className="inner-content icon-div"><FaInbox className="light-blue" /></div>
    </div></Link>
    </div>

    <div className="home-nav">
    <Link to="/customers/manage-orders"><div className="body-content body-content2">
    <div className="inner-content">
    <p>Pending Orders: <b>5</b></p>
    <div className="grey-bg"><div style={{background:"#f33"}}></div></div>
    </div>
    <div className="inner-content icon-div"><FaShoppingCart className="green" /></div>
    </div></Link>
    </div>

    <div className="home-nav">
    <a href="/customers/profile"><div className="body-content body-content2">
    <div className="inner-content">
    <p>Profile</p>
    <div className="grey-bg"><div style={{background:"#5bc0de"}}></div></div>
    </div>
    <div className="inner-content icon-div"><FaUser className="brown" /></div>
    </div></a>
    </div>

    <div className="home-nav">
    <a href="/customers/reset-password"><div className="body-content body-content2">
    <div className="inner-content">
    <p>Change Password</p>
    <div className="grey-bg"><div style={{background:"#966"}}></div></div>
    </div>
    <div className="inner-content icon-div"><FaLock className="army-green" /></div>
    </div></a>
    </div>

    </div>

    </>
    );
}

export default CustomersDashboard;