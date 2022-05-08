import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDb } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
const Shop = () => {
    const [cart, setCart] = useCart();
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://murmuring-woodland-97888.herokuapp.com/product?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [page, size]);


    useEffect(() => {
        fetch('https://murmuring-woodland-97888.herokuapp.com/productCount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10);
                setPageCount(pages);
            })
    }, []);


    const handleAddToCart = (selectedProduct) => {
        addToDb(selectedProduct._id);
        // const storeCart = getStoredCart();
        // for (const id in storeCart) {
        //     const quantity = storeCart[id];
        //     if (selectedProduct) {
        //         selectedProduct.quantity = quantity;
        //     }
        // }
        //  const newCart = [...cart, selectedProduct];//immutably copied and push
        //  setCart(newCart);
        //or
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id)
            exists.quantity += 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);


    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
                <div className='pagination'>
                    {
                        [...Array(pageCount).keys()].map(number => <button key={number} className={page === number ? 'selected' : ''} onClick={() => setPage(number)}>{number + 1}</button>)
                    }
                    <select onChange={e => setSize(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <Link to="/orders">
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;