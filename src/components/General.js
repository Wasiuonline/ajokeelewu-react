export const AppName = "Ajoke Elewu";
export const AppCurr = "&#8358;";
export const AppEmail = "info@ajokeelewu.com";
export const AppPhone = "+2349021880292";
export const FormatNumber = (amount, AppCurr="&#8358;") => {
    let thisVal = amount;
    if(isNaN(thisVal)){
    thisVal = thisVal.replace(AppCurr, "");
    thisVal = thisVal.replace(/[^0-9.]/gi, "");
    }	
    return thisVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const UsableNumber = (amount, AppCurr="&#8358;") => {
    let thisVal = amount;
    if(isNaN(thisVal)){
    thisVal = thisVal.replace(AppCurr, "");
    thisVal = thisVal.replace(/[^0-9.]/gi, "");
    }	
    return parseInt(thisVal);
}