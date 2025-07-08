import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopUp = ({setShowLogin}) => {
    const {url,setIsLoggedIn} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange= (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData((prev)=> ({...prev,[name]: value}));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;

        if (currState === 'Login') {
            newUrl += '/api/v1/user/login';
        } else {
            newUrl += '/api/v1/user/register';
        }

        try {
            const response = await axios.post(newUrl, data,{withCredentials:true});

            // this line of code in not working, due to CORS issue ,i.e. withCredentials:true is not working 
            // const response = await axios.post(newUrl, data,{withCredentials:true});

            if (response.data.success) {
                toast.success(response.data.message);
                setShowLogin(false);
                setIsLoggedIn(true);
                
                // Force full page reload after a short delay
                setTimeout(() => {
                    window.location.reload();
                }, 500); // small delay to allow toast to show
                setData({ name: "", email: "", password: "" });
            } else {
                toast.error(response.data.message || "Something went wrong");
            }

        } catch (error) {
            const message = 
                error.response?.data?.message || "Server error. Please try again.";
            toast.error(message);
            setIsLoggedIn(false);
            console.error("Login/Register error:", error);
        }
    };

    useEffect(() => {
        if (currState === "Login") {
            setData((prev) => ({ ...prev, name: "" }));
        }
    }, [currState]);



    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='cross-icon' />
                </div>
                <div className='login-popup-inputs'>
                    {currState==="Login"?<></>:<input onChange={handleChange} name='name' value={data.name} type='text' placeholder='Your name' required />}
                    <input onChange={handleChange} name='email' value={data.email} type='email' placeholder='Your email' required />
                    <input onChange={handleChange} name='password' value={data.password} type='password' placeholder='Your password' required />
                </div>
                <button type="submit">{currState==="Sign Up"?"Create Account":"Login"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By Continuing, I agree to the terms of use & Privacy Policy.</p>
                </div>

                {
                    currState==="Login"
                    ?<p>Create a new Account? <span onClick={()=>setCurrState("Sign Up")}>Click Here </span></p>
                    :<p>Already have an Account? <span onClick={()=>setCurrState("Login")}>Login Here </span></p>
                }
            </form>

        </div>
    )
}

export default LoginPopUp