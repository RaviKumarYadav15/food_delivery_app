import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount} = useContext(StoreContext);
  const totalAmount=getTotalCartAmount();
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <br/>
        <hr/>

        {
          food_list.map((item,index)=>{
            if(cartItems[item._id]>0){
              return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item' >
                  <img src={item.image.url} alt=''/>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr/>
              </div>
              )
            }
          })
        }
      </div>
      <div className='cart-bottom'>
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
                <p>${totalAmount?2:0}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <p>Total</p>
                <p>${totalAmount?totalAmount+2:0}</p>
              </div>
            </div>
          <button  onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className='cart-promocode'>
          <div>
            <p>If you have promocode, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promocode'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart