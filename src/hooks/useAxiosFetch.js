import {useState, useEffect} from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl, method="get") => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect((method="get") => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            let det;
            switch(method){
                case "post": 
                det = axios.post;
                break;
                case "put": 
                det = axios.put;
                break;
                case "patch": 
                det = axios.patch;
                break;
                case "delete": 
                det = axios.delete;
                break;
                default:
                det = axios.get;
            }
            try{
                const response = await det("http://ajokeelewu-laravel.loc" + url, {
                    cancelToken: source.token
                });
                if(isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message);
                    setData([]);
                }
            }finally{
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

    return { data, fetchError, isLoading }
}

export default useAxiosFetch;