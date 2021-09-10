import { useEffect, useState } from 'react';
import './App.css';
import FetchVal from './components/FetchVal';
import StoreVal from './components/StoreVal';

function App() {

    const [data , setData]= useState([])
    const [isLoading , setIsLoading] = useState(false)
    const [Err , setErr] = useState(null)

    /******************* 
    @Purpose : get method api
    @Parameter : {event}
    @Author : DARSH
    ******************/
    const fetchApi=async ()=>{
        setIsLoading(true)
        setErr(null)

        try{
            let res = await fetch("https://react-apii-default-rtdb.firebaseio.com/city.json")
            if(!(res.ok)){
                throw new Error("Something went wrong!!")
            }
            res = await res.json()
            console.log(res);

            let tempData =[];
            for (const key in res) {
                tempData.push({
                    id:key,
                    city: res[key].city,
                    about: res[key].about,
                    pincode: res[key].pincode
                })
            }

            setData(tempData)
        }
        catch(err){
            setErr(err.message)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    /******************* 
    @Purpose : useEffect
    @Parameter : {}
    @Author : DARSH
    ******************/
    useEffect(()=>{
       fetchApi()
    },[])

    return (
      <div className="App">
        <StoreVal fetchApi={fetchApi}/>
        <FetchVal data={data} isLoading={isLoading} Err={Err} fetchApi={fetchApi}/>
      </div>
    );
}

export default App;
