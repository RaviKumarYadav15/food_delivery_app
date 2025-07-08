import React, {useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({url}) => {
    const [image,setImage] = useState(null);
    const [preview,setPreview] = useState(assets.upload_area);
    const [data, setData] = useState({
        name:'',
        description:'',
        category:'Salad',
        price:''
    });

    const handleImageChange = (e)=>{
        const file = e.target.files[0];

        if(file){
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        // const {name,value} = e.target;
        setData((prev)=>({...prev,[name]:value}))
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("category",data.category);
        formData.append("price",data.price);
        formData.append("foodImage",image);
        
        try {
            const response = await axios.post(`${url}/api/v1/food/add`, formData);

            if (response.data.success) {
                toast.success(response.data.message);
                setData({ name: '', description: '', category: 'salad', price: '' });
                setImage(null);
                setPreview(assets.upload_area);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Server error occurred");
            console.error(error);
        }
    };

    // checking if the data updating succeffully or not
    // useEffect(()=>{
    //     console.log(data)
    // },[data])

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={preview} alt=''/>
                </label>
                <input onChange={handleImageChange} type='file' id='image' hidden  required/>
            </div>
            <div className='add-product-name flex-col'>
                <p>Product Name</p>
                <input onChange={handleChange} value={data.name} type='text' name='name' placeholder='Type here'></input>
            </div>

            <div className='add-product-description flex-col'>
                <p>Product Description</p>
                <textarea onChange={handleChange} value={data.description} name='description' rows='6' placeholder='Write content here'/>
            </div>

            <div className="add-category-price">
                <div className='add-category flex-col'>
                    <p>Product category</p>
                    <select onChange={handleChange} value={data.category} name='category'>
                        <option value='Salad' default>Salad</option>
                        <option value='Rolls'>Rolls</option>
                        <option value='Deserts'>Deserts</option>
                        <option value='Sandwich'>Sandwich</option>
                        <option value='Cake'>Cake</option>
                        <option value='Pure Veg'>Pure Veg</option>
                        <option value='Pasta'>Pasta</option>
                        <option value='Noodles'>Noodles</option>
                    </select>
                </div>

                <div className='add-price flex-col'>
                    <p>Product Price</p>
                    <input onChange={handleChange} value={data.price} type='number' name="price" placeholder='$20'/>
                </div>
            </div>
            <button type="submit" className='add-btn'> ADD</button>
        </form>
    </div>
  )
}

export default Add