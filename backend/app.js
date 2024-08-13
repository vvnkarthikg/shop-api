
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); // Load .env file
const mongoose = require('mongoose');

// Import the routers
const productRoutes = require('./api/routes/products'); 
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const home = require('./api/routes/home');


// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:'http://localhost:3000'}));

// Mount the routers
app.use('/products', productRoutes); 
app.use('/orders', orderRoutes);
app.use('/user',userRoutes);
app.use('/',home);


// Database connection
const dbURL = process.env.database_url ;
mongoose.connect(dbURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
