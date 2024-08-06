const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middlewares/check-auth');


router.get('/',checkAuth,(req,res)=>{
    order.find().populate('product')
    .then((orders)=>{
        res.status(200).json({
            count:orders.length,
            orders:orders.map(order =>{
                return{
                    id:order._id,
                    product:order.product,
                    quantity:order.quantity
                }
            })
        });
        }).catch((err)=>{
            res.status(500).json({message:err.message});
            });

    try{
        res.status(200).send('get orders')


    }
    catch(error){
        res.status(500).send({message:error.message});

    }

});

router.post('/', checkAuth,async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newOrder = new order({
            quantity: req.body.quantity,
            product: req.body.productId
        });

        const result = await newOrder.save();
        console.log(result);
        return res.status(201).json({ message: 'Order created', result });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

router.get('/:orderId',checkAuth,(req,res)=>{

    try{
        const id = req.params.orderId;
        order.findById(id).populate('product')
        .then(order=>{
            res.status(200).json({
                order : order
            });
        })
    res.status(200).send('specific orders')

    }
    catch(error){
        res.status(500).json(error);

    }
    
});

router.delete('/:orderId',checkAuth,(req,res)=>{
    try{
        const id = req.params.orderId;
        order.remove({_id:id})
        .then(order =>{
            if(!order){
                return res.status(404).json({message: 'Order not found'});
            }
            res.status(200).json({message : 'deleted',
                order : order});
        });
    res.status(200).send('specific delete orders');

    }
    catch(error){
        res.status(500).send({message:error.message});

    }
    
});


module.exports = router;