import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSpinner, FaReply } from 'react-icons/fa';
import { decode } from 'html-entities';
import '../css/response.css';
import axios from '../api/axios';
import DataContext from '../context/DataContext';
import { AppCurr, FormatNumber } from '../components/General';

const PaystackResponse = () => {

    const [response, SetResponse] = useState("");
    const [trans, SetTrans] = useState(2);
    const {user, transaction, handleLogout, ErrorToast} = useContext(DataContext);
    const navigate = useNavigate();

    if(user==="" || transaction===""){
        navigate("/cat/all");
    }

    useEffect(() => {
        if(trans!==0){
        let load_obj = {
            method: 'post',
            url: "/api/paystack-response",
            data: {trans_id: transaction.trans_id, trans_ref: transaction.trans_ref}
            }
            load_obj["headers"] = { 
                "Authorization": `Bearer ${user.token}`,
                "token": user.token
            };
        axios(load_obj)
        .then(res => {
            SetResponse(res.data);
            SetTrans(0);
        })
        .catch(err => {
            if(err.response.data.message === "Unauthenticated." || err.response.data.message === "Unauthorized"){
                handleLogout("You are not logged in.");
                navigate("/login");
            }else{
                ErrorToast(err.response.data.message);
            }
            SetTrans(0);
        });

    }}, [trans]);

    return (
    <div className="home-body-wrapper">
    <div className="container" style={{maxWidth:"1200px"}}>
    <h1 className="body-header">Paystack <span>Response</span></h1>
    <div className="col-md-2">
    </div>
    <div className="col-md-8 padding-20">
    {response?
    <>
    <table className="table table-striped table-hover"><tbody>
    <tr><td className="bold" style={{width:"200px"}}>Transaction Ref.</td><td>{response.trans_ref}</td></tr>
    <tr><td className="bold">Depositor&#039;s Name</td><td>{response.username}</td></tr>
    <tr><td className="bold">Depositor&#039;s Email</td><td>{response.user_email}</td></tr>
    <tr><td className="bold">Service</td><td>Payment for product order with invoice number #{response.invoice_no}</td></tr>
    <tr><td className="bold">Amount</td><td>{decode(AppCurr)}{FormatNumber(response.amount)}</td></tr>
    <tr><td className="bold">Status Code</td><td>{response.response_code}</td></tr>
    <tr><td className="bold">Status Message</td><td><div className={`btn btn-${response.btn_class}`}>{response.response_description}</div></td></tr>
    </tbody></table>
    <div><Link onClick={()=>SetTrans(2)} className="btn btn-primary float-left">{trans == 2 ? <FaSpinner className="fa-spin" /> :  <FaReply /> } Requery</Link> <Link to="/customers/manage-orders" className="btn gen-btn float-right">View Orders</Link></div>
    </> 
    : <p className='align-center'><FaSpinner className="fa-spin" /></p> }
    </div>
    </div>
    </div>
    );
};
export default PaystackResponse;