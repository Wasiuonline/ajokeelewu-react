import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {decode} from 'html-entities';
import { FaEye } from 'react-icons/fa';
import DataContext from '../context/DataContext';
import { AppName, AppCurr, FormatNumber } from '../components/General';

const BankDeposit = () => {

    const navigate = useNavigate();

    const {user, transaction} = useContext(DataContext);

    const title = "Bank Deposit | " + AppName;
    document.title = title;

    if(user==="" || transaction===""){
        navigate("/cat/all");
    }

    return (
        <div className="home-body-wrapper">
        <div className="container">

            <h1 className="body-header">Bank <span>Deposit</span></h1>

            <p>You have chosen to deposit or transfer <b style={{color:"#f11"}}>{decode(AppCurr)}{FormatNumber(transaction.total)}</b> for your placed order. Kindly make use of the information below:</p>

            <p><b style={{color:"#f11"}}>Bank Transfer:</b><br />
            Kindly make transfer to the following account details:
            <ul type="disc">
            <li><b>Account Number:</b> 1015387629</li>
            <li><b>Bank Name:</b> Zenith Bank</li>
            <li><b>Account Name:</b> Castle and Retail</li>
            </ul></p>

            <p><b>NB:</b> Please send name of account and bank transferred from as proof of payment.</p>

            <p><b style={{color:"#f11"}}>Bank Deposit:</b><br />
            Kindly make deposit to the following account details:
            <ul type="disc">
            <li><b>Account Number:</b> 3003204862</li>
            <li><b>Bank Name:</b> United Bank for Africa</li>
            <li><b>Account Name:</b> Ajoke Adesi Elewu</li>
            </ul></p>

            <p><b>NB:</b> Please send name of depositor and teller number as proof of payment.</p>

            <p><b style={{color:"#f11"}}>Online Payment:</b><br />
            Kindly make use of the ReliancePay option to make payment with your atm card.</p>

            <div><Link className="btn gen-btn float-right" to="/customers/manage-orders"><FaEye /> View your placed order</Link></div>

        </div>
        </div>
    );
};
export default BankDeposit;