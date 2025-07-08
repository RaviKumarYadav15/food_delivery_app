import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = useState([]);

  // const fetchList = async () => {
  //   try {
  //     const response = await axios.get(`${url}/api/v1/food/list`);
  //     if (response.data.success) {
  //      if(!response.data.data.length) toast.success(response.data.message);
  //       setList(response.data.data);
  //     } else {
  //       toast.error(`Error: ${response.data.message}`);
  //       console.log(response.data.data);
  //     }
  //   } catch (err) {
  //     toast.error("Something went wrong while fetching the list.");
  //     console.error(err);
  //   }
  // };


  const fetchList = async () => {
  try {
    const response = await axios.get(`${url}/api/v1/food/list`);
    const { success, data, message } = response?.data || {};

    if (success) {
      setList(data);
      if (!data.length) {
        toast.info(message || "No food items found.");
      }
    } else {
      toast.error(`Error: ${message || "Failed to fetch food items."}`);
      console.warn("Response Data:", data);
    }
  } catch (err) {
    toast.error("Something went wrong while fetching the list.");
    console.error("Fetch List Error:", err);
  }
};


  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/v1/food/remove/${foodId}`);
      if (response.data.success) {
        await fetchList();
        toast.success(response.data.message);
      } else {
        toast.error("Error while removing food.");
      }
    } catch (err) {
      toast.error("Something went wrong while removing the food.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='List add flex-col'>
      <p>All Food List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item) => (
            <div key={item._id} className='list-table-format'>
              <img src={item.image?.url} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default List;
