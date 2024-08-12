import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductCss.css';

const Product = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products') // Adjust the URL if needed
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log('Error: ' + error); // Consistent error variable
            });
    }, []); // Empty array ensures the effect runs only once on mount

    return (
        <div className="product-grid">
            {products.map(product => (
                <div className="product-card" key={product.productId}>
                    <img src={product.productImage} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <p>Left: {product.quantity}</p> {/* Corrected "Left" label */}
                </div>
            ))}
        </div>
    );
}

export default Product;
