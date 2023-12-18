import React from 'react';
import {Link} from "react-router-dom";
const Contact = () => {
    return (
        <div>
            <h1>Contact us</h1>
            <p>This is Contact us page <Link to="/customers">Dashbaord</Link></p>
        </div>
    );
};
export default Contact;