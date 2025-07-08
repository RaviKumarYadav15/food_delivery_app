
import { createContext, useEffect } from "react";
export const StoreContext = createContext(null)
import { useState } from "react";
import axios from "axios";

const StoreContextProvider = (props)=>{
    //backend url
    const url = "http://localhost:8080";

    const [cartItems, setcartItems] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [food_list, setFoodList] = useState([]);

    const fetchFoodList = async ()=>{
        const response = await axios.get(url + "/api/v1/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async ()=>{
        const response = await axios.get(url + "/api/v1/cart/list", { withCredentials: true });
        setcartItems(response.data.data);
        // console.log(response.data.data)
    }

    const addToCart = async (itemId) => {
        setcartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        try {
            await axios.post(url + "/api/v1/cart/add", { itemId }, { withCredentials: true });
            await loadCartData();
        } catch (error) {
            console.log("Error while adding to cart");
        }
    };

    
    const removeFromCart = async(itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        
        try {
           await axios.post(url + "/api/v1/cart/remove", { itemId }, { withCredentials: true });
        } catch (error) {
            console.log("Error while removing food to cart")
        }
    }

    // use to check if it store the cart items or not
    // useEffect(()=>{
    //     console.log(cartItems);        
    // },[cartItems])


    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        if(cartItems){
            for (const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=> product._id===item);                
                totalAmount+=itemInfo?.price*cartItems[item];
            }
        }}
        return totalAmount;
    }

    // function getCookie(name) {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(';').shift();
    // }

    //NOTE: cannot access the cookie in frontend , because of http only used in cookie for security
    // function getCookie(name) {
    //     const cookies = document.cookie.split('; ');
    //     console.log(cookies);
    //     for (let cookie of cookies) {
    //         const [key, value] = cookie.split('=');
    //         if (key === name) return decodeURIComponent(value);
    //     }
    //     return null;
    // }


    const clearAppState = () => {
        setcartItems({});
        setIsLoggedIn(false);
        setFoodList([]);
    };


    //write this to so that user don't get logged out when he refreshes the page
    useEffect(() => {
        const checkLoginStatus = async () => {
            await fetchFoodList();

            try {
                const response = await axios.get(
                    url + "/api/v1/user/verify",
                    { withCredentials: true }
                );

                if (response.data.success) {
                    setIsLoggedIn(true);
                    await loadCartData();
                }
                 else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
               if (error.response && error.response.status === 401) {
                    console.warn("Not logged in:", error.response.data.message);
                } else {
                    console.error("Unexpected error:", error.message);
                }
                setIsLoggedIn(false);
            }         
        };

        checkLoginStatus();
    }, []);

    const contextValue={
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        // getCookie,
        isLoggedIn,
        setIsLoggedIn,
        clearAppState
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;