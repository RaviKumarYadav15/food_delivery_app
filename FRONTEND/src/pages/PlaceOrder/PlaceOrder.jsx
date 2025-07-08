import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount,food_list,cartItems,url,isLoggedIn} = useContext(StoreContext);

  const totalAmount=getTotalCartAmount();
  const DELIVERY_CHARGES = 2;

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (e)=>{
    const {name,value} = e.target;
    setData((prev)=>({...prev,[name]:value}));
  }

  const placeorder = async(e)=>{
    e.preventDefault();

    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems)

    let orderData = {
      address: data,
      items:orderItems,
      amount:totalAmount+DELIVERY_CHARGES
    }

    let response = await axios.post(url + "/api/order/placeOrder", orderData);

    if(response.data.success){
      const {session_url} = response.data.data;
      window.location.replace(session_url);
    }
    else{
      alert("Something went wrong while placing order");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/cart');
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[isLoggedIn])


  // useEffect(()=>{
  //     console.log("Data changed",data);
  // },[data])

  return (
    <form onSubmit={placeorder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input onChange={onChangeHandler} name="firstName" value={data.firstName} type='text' placeholder='First Name' required/>
          <input onChange={onChangeHandler} name="lastName" value={data.lastName} type='text' placeholder='Last Name' required/>
        </div>
        <input onChange={onChangeHandler} name="email" value={data.email} type='email' placeholder='Email Address' required/>
        <input onChange={onChangeHandler} name="street" value={data.street} type='text' placeholder='Street' required/>
        <div className='multi-fields'>
          <input onChange={onChangeHandler} name="city" value={data.city} type='text' placeholder='City' required/>
          <input onChange={onChangeHandler} name="state" value={data.state} type='text' placeholder='State' required/>
        </div>
        <div className='multi-fields'>
          <input onChange={onChangeHandler} name="zipcode" value={data.zipcode} type='text' placeholder='Zip Code' required/>
          <input onChange={onChangeHandler} name="country" value={data.country} type='text' placeholder='Country' required/>
        </div>
        <input onChange={onChangeHandler} name="phone" value={data.phone} type='text' placeholder='Phone' required/>
      </div>
      <div className='place-order-right'>
        <div className='cart-total'> 
            <h2>Cart Total</h2>
            <div>
              <div className='cart-total-details'>
                <p>SubTotal</p>
                <p>${totalAmount}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>${totalAmount?DELIVERY_CHARGES:0}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <p>Total</p>
                <p>${totalAmount?(totalAmount+DELIVERY_CHARGES).toFixed(2):"0.00"}</p>
              </div>
            </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>

    
  )
}

export default PlaceOrder