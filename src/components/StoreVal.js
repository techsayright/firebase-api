import React, { useRef } from 'react'
import styles from './css/StoreVal.module.scss'

export default function StoreVal({fetchApi}) {
    const cityRef = useRef(null),
        aboutRef = useRef(null) ,
        pinRef = useRef(null)


    /******************* 
    @Purpose : add to api firebase
    @Parameter : {object}
    @Author : DARSH
    ******************/
    const addToFireBase =async obj=>{
        let res = await fetch("https://react-apii-default-rtdb.firebaseio.com/city.json", {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        console.log(res);
        
        fetchApi()
    }

    /******************* 
    @Purpose : submit handler
    @Parameter : {event}
    @Author : DARSH
    ******************/
    const submitHandler=e=>{
        e.preventDefault()

        const {city, about, pincode}= e.target.elements;

        if(city.value.trim().length===0){
            cityRef.current.focus()
            return
        }else if(about.value.trim().length===0){
            aboutRef.current.focus()
            return
        }else if(pincode.value.trim().length===0){
            pinRef.current.focus()
            return
        }

        const objForAdd ={ 
            city : city.value,
            about: about.value,
            pincode: pincode.value
        }

        addToFireBase(objForAdd)
        
        city.value=""
        about.value=""
        pincode.value=""
    }
    return (
        <div className={styles.store_val}>
            <form  onSubmit={submitHandler}>
                <div>
                    <label htmlFor="city">City Name</label>  <br />
                    <input type="text" placeholder="Enter city name" id="city" ref={cityRef}/>
                </div>
                <div>
                    <label htmlFor="about">About</label> <br />
                    <textarea type="text" placeholder="About City" id="about" ref={aboutRef}/>
                </div>
                <div>
                    <label htmlFor="pincode">Pin-Code</label> <br />
                    <input type="text" placeholder="Enter Pincode of City" id="pincode" ref={pinRef}/>
                </div>
                <div>
                    <button type="submit"  id="btn_submit" className={styles.btn_submit} >Submit</button>
                </div>

            </form>
        </div>
    )
}
