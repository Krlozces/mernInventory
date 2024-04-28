import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import ProductsCard from "../components/home/ProductsCard.jsx";
import ProductsTable from "../components/home/ProductsTable.jsx";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/products')
            .then((response) => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    
    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hove:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('table')}>
                    Table
                </button>
                <button className="bg-sky-300 hove:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('card')}>
                    Card
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Products List</h1>
                <Link to="/products/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    showType === 'table' ? (<ProductsTable products={products} />) : (<ProductsCard products={products} />)
                )
            }
        </div>
    )
}
