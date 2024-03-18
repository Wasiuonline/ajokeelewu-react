import React, {useEffect} from 'react';
import { loadStyle, loadScript } from './LoadFile';

const ReusableFiles = () => {

    useEffect(() => {
        
    loadStyle("css/bootstrap.css");
    loadStyle("css/font-awesome.css");
    loadStyle("css/jquery-ui.css");
    loadStyle("css/select2.min.css"); 
    
    loadScript("js/bootstrap.min.js");
    loadScript("js/jquery-ui.js");
    loadScript("js/select2.min.js");
    loadScript("js/sweetalert.min.js");

    }, []);

};

export default ReusableFiles;