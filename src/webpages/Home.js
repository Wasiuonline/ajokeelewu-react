import React from 'react';

//import DataContext from '../context/DataContext';
//import useAxiosFetch from '../hooks/useAxiosFetch';
//import api from '../api/post'; , {useContext, useEffect, useState}
const Home = () => {

    /*const [mon, setMon] = useState(0);
    const { data, fetchError, isLoading } = useAxiosFetch("", "get");
    console.log(data);
    console.log(fetchError);
    console.log(isLoading);
    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await api.get("/api/v1/image");
                setMon(response.data);
            }catch(err){
                if(err.response){
                    console.log(err.response.data); 
                    console.log(err.response.status); 
                    console.log(err.response.headers);  
                }else{
                    console.log(`Error: ${err.message}`);  
                }
            }
        }
        fetchPost();
    }, []);*/
    return (
        <div>
            <h1>Welcome to Xcelvations</h1>
            <p>This is home page</p>
        </div>
    );
};
export default Home;