import React from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'


const MyOrder = () => {
    const {url,isLoggedIn} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async()=>{
        const response = await axios.post(url + "/api/order/userorders",{});
        setData(response.data.data);
    }

    useEffect(()=>{
        if(isLoggedIn){
            fetchOrders();
        }
    },[isLoggedIn])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='container'>
        {
            data.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt=""/>
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+ "x" + item.quantity
                            }
                            else{
                                return item.name+ "x" + item.quantity + ", "
                            }
                        })}</p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default MyOrder