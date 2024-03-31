import React from 'react';

const PaymentOptions = () => {

    return (
        <div className="home-body-wrapper">
        <div className="container">

            <h1 className="body-header">Payment <span>Options</span></h1>

            <h4 style={{color:"#f11"}}>Bank Transfer:</h4>

            <p>Kindly make transfer to the following account details:</p>

            <p><b style={{color:"#966"}}>Naira Account</b></p>

            <ul> 
            <li><b>Account Number:</b> 3003204862</li>
            <li><b>Bank Name:</b> United Bank for Africa</li>
            <li><b>Account Name:</b> Ajoke Adesi Elewu</li>
            </ul>

            <p><b>NB:</b> Please send your <b>registered email address</b>, <b>payment date</b>, <b>amount paid</b>, <b>items names</b>, <b>name of account</b> and bank transferred from as proof of payment.</p>

            <h4 style={{color:"#f11"}}>Bank Deposit:</h4>

            <p>Kindly make deposit to the following account details:</p>

            <p><b style={{color:"#966"}}>Naira Account</b></p>

            <ul>
            <li><b>Account Number:</b> 3003204862</li>
            <li><b>Bank Name:</b> United Bank for Africa</li>
            <li><b>Account Name:</b> Ajoke Adesi Elewu</li>
            </ul>

            <p><b>NB:</b> Please send your <b>registered email address</b>, <b>payment date</b>, <b>amount paid</b>, <b>items names</b>, <b>name of account</b> and bank transferred from as proof of payment.</p>

            <h4 style={{color:"#f11"}}>Online Payment:</h4>

            <p>Kindly make use of the PayStack option to make payment with your atm card.</p>

        </div>
        </div>
    );
};
export default PaymentOptions;