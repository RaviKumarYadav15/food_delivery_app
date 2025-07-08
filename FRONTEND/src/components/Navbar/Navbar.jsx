import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount,isLoggedIn,setIsLoggedIn,url,clearAppState} = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = async()=>{

    const response = await axios.get(`${url}/api/v1/user/logout`, { withCredentials: true });

    if(response.data.success){
      setIsLoggedIn(false);
      navigate("/");//navigating the user to homepage after logout
      toast.success(response.data.message);


      // this is extra to refresh the page on LOGOUT
      // clearAppState();         // Clear cart, user, etc.
      // navigate("/");      // Navigate to login page
      // toast.success("Logged out");
      
      
      // this is extra to refresh the page on LOGOUT
      // Force full page reload after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 500); // small delay to allow toast to show
    }
    else{
      toast.error(response.data.message || "Something went wrong");
    }

  }
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt='logo-of-app' className='logo'/></Link>
        <ul className='navbar-menu'> 
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt="search-icon"/>
            <div className='navbar-search-icon'>
                <Link to='/cart'><img src={assets.basket_icon} alt='basket-icon'/></Link>
                <div className={getTotalCartAmount()?'dot':''}></div>
            </div>
            {
              !isLoggedIn ?<button onClick={()=>setShowLogin(true)}>sign in</button>
              : <div className='navbar-profile'>
                  <img src={assets.profile_icon} alt='profile-icon'/>
                  <ul className='nav-profile-dropdown'>
                    <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt=''/><p>Orders</p> </li>
                    <hr/>
                    <li onClick={logout}> <img src={assets.logout_icon} alt=''/><p>LogOut</p></li>
                  </ul>
                </div>
            }
        </div>
    </div>
  )
}

export default Navbar