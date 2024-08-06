// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middlewares/check-auth');

const Product = require('../models/product');
//or import {Product} from '../models/product';

// Define routes
router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post('/', checkAuth,  async(req, res) => {
    console.log('Request body:', req.body);
    try {
      const { name, price, productImage } = req.body;
      console.log('Extracted data:', { name, price, productImage });
  
      if (!name || !price) {
        return res.status(400).json({
          message: "Please provide both name and price",
          providedFields: Object.keys(req.body)
        });
      }
  
      const newProduct = new Product({
        name,
        price: Number(price),  // Ensure price is a number
        productImage
      });
  
      const product = await Product.create(newProduct);
      return res.status(201).json({ product, message: "Created successfully" });
    } catch(error) {
      console.error('Error:', error);
      res.status(500).json({ message: error.message });
    }
  });



router.get('/:productId',async(req,res)=>{
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

});

router.get('/name/:productName', async (req, res) => {
    try {
        const { productName } = req.params;
        console.log(`Searching for products with name: ${productName}`); // Debug log

        // Find all products that match the given name
        const docs = await Product.find({ name: productName }).select('_id name price');

        // Transform documents into the desired response format
        const response = {
            count: docs.length,
            products: docs.map(doc => ({
                id: doc._id,
                name: doc.name,
                price: doc.price
            }))
        };

        // Check if no products were found
        if (response.count === 0) {
            return res.status(404).send({ message: 'No products found with that name' });
        }

        // Return the array of products
        res.status(200).json(response);
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        res.status(500).send({ message: error.message });
    }
});



router.patch('/:productId',checkAuth,async(req,res)=>{
    try {
        const { productId } = req.params;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

});

router.delete('/:productId',checkAuth,async(req,res)=>{
    try {
        const { productId } = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router; // Ensure this line is present
