import { useState } from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function CreateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveProduct = () => {
        const data = {
            name,
            description,
            price,
            stockQuantity,
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/products', data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Product Created successfully', { variant: 'success' })
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happened. Please check the console');
                enqueueSnackbar('Error', { variant: 'error' })
                console.log(error);
            });
    };
    
    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Create Product</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px p-4 mx-auto]">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500" htmlFor="">Name</label>
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="border-2 border-gray-500 px-4 py-2 w-full" 
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500" htmlFor="">Description</label>
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="border-2 border-gray-500 px-4 py-2 w-full" 
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500" htmlFor="">Price</label>
                    <input 
                        type="number" 
                        name="" 
                        id="" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="border-2 border-gray-500 px-4 py-2 w-full" 
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500" htmlFor="">Stock</label>
                    <input 
                        type="number" 
                        name="" 
                        id="" 
                        value={stockQuantity} 
                        onChange={(e) => setStockQuantity(e.target.value)} 
                        className="border-2 border-gray-500 px-4 py-2 w-full" 
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleSaveProduct}>
                    Save
                </button>
            </div>
        </div>
    )
}
