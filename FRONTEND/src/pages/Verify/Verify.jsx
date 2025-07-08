import React from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';
const Verify = () => {

    const [searchParams, setSearchParams] =  useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("odrerId");
    const navigate = useNavigate();

    const {url}  = useContext(StoreContext)
    
    const verifyPayment = async() =>{
        const response = await axios.post(url + "/api/order/verify",{success,orderId});

        try {
            if(response.data.success){
                navigate('/myorders');
            }
        } catch (error) {
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className='spinner'>

        </div>
        
    </div>
  )
}

export default Verify