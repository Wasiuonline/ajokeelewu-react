import React from 'react';

const SuccessMsg = ({res}) => {
   
    return <div className="success">{res.data}</div>

}

export const ErrMsg = ({err}) => {
    if(err.message === "Network Error"){
        return <div className="not-success">{err.message}! Please check your internet connection and try again.</div>
    }else if(err.response.data.message === "Unauthenticated."){
        return 1;
    }else if(err.message === "ERR_BAD_REQUEST"){
        return <div className="not-success">{err.message}! Please check the inputted data and try again.</div>
    }else{
        return <div className="not-success">{err.response.data.message}</div>
    }

}

export const ErrorMsg = ({err}) => {
    if(err.message === "Network Error"){
        return err.message + "! Please check your internet connection and try again.";
    }else if(err.response.data.message === "Unauthenticated."){
        return 1;
    }else if(err.message === "ERR_BAD_REQUEST"){
        return "Please check the inputted data and try again.";
    }else{
        return err.response.data.message;   
    }

}

export default SuccessMsg;