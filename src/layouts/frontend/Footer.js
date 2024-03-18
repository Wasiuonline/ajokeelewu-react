import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom";
import { FaEnvelope, FaSpinner } from "react-icons/fa";
import axios from '../../api/axios';
import DataContext from '../../context/DataContext';

const Footer = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newsletterRotate, setNewsletterRotate] = useState(false);
    const [newsletterMsg, setNewsletterMsg] = useState("");
    const {SuccessMsg, ErrMsg} = useContext(DataContext);

    const handleNewsletter = (e) => {
    e.preventDefault();
    setNewsletterRotate(true);
    setNewsletterMsg("");

    axios({
        method: 'post',
        url: "/newsletter",
        data: {name,email},
    })
    .then(res => {
        console.log(res);
        setNewsletterRotate(false); 
        setName("");
        setEmail("");
        setNewsletterMsg(<SuccessMsg res={res} />);
    })
    .catch(err => {
        console.log(err);
        setNewsletterRotate(false);
        setNewsletterMsg(<ErrMsg err={err} />);
    })

    }

    return (
        <>
            
<div className="general-fade"></div>

<div className="general-result"></div>

<div className="footer-container">
<div className="footer-wrapper">
<div className="footer container">

<div className="col-sm-4 nav-link share">
<div className="title btn">CONTACT US</div>
<Link to="mailto:contact@ajokeelewu.com"><i className="fa fa-envelope" aria-hidden="true"></i> contact@ajokeelewu.com</Link>
<Link to="tel:+23412345678"><i className="fa fa-phone" aria-hidden="true"></i> +23412345678</Link>
</div>

<div className="col-sm-4 nav-link">
<div className="title btn">QUICK LINKS</div>
<Link to="/" className=""><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
<Link to="/about" className=""><i className="fa fa-university" aria-hidden="true"></i> About Us</Link>
<Link to="/contact" className=""><i className="fa fa-phone" aria-hidden="true"></i> Contact Us</Link>
<Link to="/payment-options" className=""><i className="fa fa-money" aria-hidden="true"></i> Payment Options</Link>
<Link to="/size-guide" className=""><i className="fa fa-female" aria-hidden="true"></i> Size Guide</Link>
<Link to="/delivery" className=""><i className="fa fa-car" aria-hidden="true"></i> Delivery</Link>
<Link to="/exchange-and-returns" className=""><i className="fa fa-file-text" aria-hidden="true"></i> Exchange &amp; Returns</Link>
</div>

<div className="col-sm-4 subscribe">
<div className="title btn">NEWSLETTER</div>
<form onSubmit={handleNewsletter}>

{newsletterMsg?newsletterMsg:""}

<div className="form-group input-group">
<span className="input-group-addon"><i className="fa"><label htmlFor="name">Name</label></i></span>
<input type="text" name="name" className="form-control" value={name} placeholder="Your name" required onChange={(e) => setName(e.target.value)} />
</div>

<div className="form-group input-group">
<span className="input-group-addon"><i className="fa"><label htmlFor="email">Email</label></i></span>
<input type="email" name="email" className="form-control" value={email} placeholder="Your email" required onChange={(e) => setEmail(e.target.value)} />
</div>

<div>
<button className="btn gen-btn float-right" disabled = {newsletterRotate?true:false}>{newsletterRotate?<FaSpinner className="fa-spin" />:<FaEnvelope />} Subscribe</button>

</div>	

</form>
<div className="footer-social align-center">
<Link to="" title="Facebook" className="border-radius" ><i className="fa fa-facebook" aria-hidden="true"></i></Link>
<Link to="" title="Twitter" className="border-radius" ><i className="fa fa-twitter" aria-hidden="true"></i></Link>
<Link to="" title="Google +" className="border-radius" ><i className="fa fa-google-plus" aria-hidden="true"></i></Link>
<Link to="" title="Pinterest" className="border-radius" ><i className="fa fa-pinterest-p" aria-hidden="true"></i></Link>
<Link to="" title="Instagram" className="border-radius" ><i className="fa fa-instagram" aria-hidden="true"></i></Link>
</div>
</div>

</div>
</div>
</div>

<div className="copyright">Copyright &copy; 2023 Ajokeelewu. All Rights Reserved.<br />Developed by: <Link to="http://reliancewisdom.com" >Reliance Wisdom Digital.</Link></div>

        </>
    );
};
export default Footer;