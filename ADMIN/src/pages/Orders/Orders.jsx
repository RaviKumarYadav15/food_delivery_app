import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../../../FRONTEND/src/assets/assets';
const Orders = ({url}) => {
  

  const [orders,setOrders] = useState([]);
  const fetchAllOrders = async ()=>{
    const response = await axios.get(url + "/api/v1/order/list");
    if(response.data.success){
      setOrders(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  const statusHandler = async(event,orderId)=>{
      const response = await axios.post (url + "/api/v1/order/status",
        {
          orderId,
          status:event.target.value
        }
      );

      if(response.data.success){
        await fetchAllOrders();
      }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {
          orders.map((order,index)=>{
            return(
              
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt=""/>
                <div>
                  <p className='order-item-food'>
                    {
                      order.items.map((item,index)=>{
                        if(index===order.items.length-1){
                          return item.name + "x " + item.quantity
                        }
                        else{
                          return item.name + "x " + item.quantity + ", "
                        }
                      })
                    }
                  </p>
                  <p className="order-item-name"> {order.address.firstName + " " + order.address.lastName}</p>
                  <div className='order-item-address'>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </div>
                  <p> Items: {order.items.length}</p>
                  <p>${order.amount}</p>
                  <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for Delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
              </div>
            );
              
            
          })
        }
      </div>
      
    </div>
  )
}

export default Orders