import React, {useContext} from "react";
import {Home, About, Contact, Cat, Details, Cart, Checkout, Preview, PaystackResponse, BankDeposit, PaymentOptions, SizeGuide, Delivery, ExchangeAndReturns, Login, Register, Logout, ForgotPassword, Missing} from '../layouts/frontend/FrontEndLoader';
import FrontEndLayout from "../layouts/frontend/FrontEndLayout";
import {CustomersDashboard, Inbox, ManageOrders, PaymentNotifications, Profile, ResetPassword, SavedItems, SentMessages, TransactionLog} from '../layouts/customers/CustomersLoader';
import CustomersLayout from "../layouts/customers/CustomersLayout";
import {AdminDashboard} from '../layouts/aeadmin/AdminLoader';
import AdminLayout from "../layouts/aeadmin/AdminLayout";
import HomeRedirect from "../components/HomeRedirect";
import DataContext from '../context/DataContext';

import {Route, Routes} from "react-router-dom";

const WebRoute = () => {
    const {user} = useContext(DataContext);

    return(
        
        <Routes>
        <Route path = "/aeadmin" element={user?<AdminLayout />:<HomeRedirect />}>
        <Route index element = {<AdminDashboard />} />
        </Route>
        <Route element={<FrontEndLayout />}>
        <Route exact index element = {<Home />} />
        <Route exact path = "/about" element = {<About />} />
        <Route exact path = "/contact" element = {<Contact />} />
        <Route path = "/cat/:catSlug" element = {<Cat />} />
        <Route path = "/cat/:catSlug/:pageNo" element = {<Cat />} />
        <Route path = "/details/:itemSlug/:pageNo" element = {<Details />} />
        <Route path = "/cart" element = {<Cart />} />
        <Route path = "/checkout" element = {<Checkout />} />
        <Route path = "/preview" element = {<Preview />} /> 
        <Route path = "/paystack-response" element = {<PaystackResponse />} />
        <Route path = "/bank-deposit" element = {<BankDeposit />} />
        <Route path = "/payment-options" element = {<PaymentOptions />} />
        <Route path = "/size-guide" element = {<SizeGuide />} />
        <Route path = "/delivery" element = {<Delivery />} />
        <Route path = "/exchange-and-returns" element = {<ExchangeAndReturns />} />
        <Route exact path = "/login" element = {<Login />} />
        <Route exact path = "/register" element = {<Register />} />
        <Route exact path = "/logout" element = {<Logout />} />
        <Route exact path = "/forgot-password" element = {<ForgotPassword />} />
        <Route path = "/customers" element={user?<CustomersLayout />:<HomeRedirect />}>
        <Route path = "" element = {<CustomersDashboard />} />
        <Route path = "inbox" element = {<Inbox />} />
        <Route path = "manage-orders" element = {<ManageOrders />} />
        <Route path = "payment-notifications" element = {<PaymentNotifications />} />
        <Route path = "profile" element = {<Profile />} />
        <Route path = "reset-password" element = {<ResetPassword />} />
        <Route path = "saved-items" element = {<SavedItems />} />
        <Route path = "sent-messages" element = {<SentMessages />} />
        <Route path = "transaction-log" element = {<TransactionLog />} />
        </Route>
        <Route path = "*" element = {<Missing />} />
        </Route>
        </Routes>        
       
        );
}

export default WebRoute;