const ErrorMsg = ({err}) => {
    
    if(err.message === "Network Error"){
        return err.message + "! Please check your internet connection and try again.";
    }else if(err.message === "ERR_BAD_REQUEST"){
        return "Please check the inputted data and try again.";
    }else{
        return err.response.data.message;   
    }

}

export default ErrorMsg;