//we install mongoose-sequence to auto-increment order id


const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number, // Changed to Number for price, it should not be a string
        required: true,
        default: 0
    },
    productImage: {
        type: String,
        default: null
    },
    productId: { // Auto-incrementing field
        type: Number,
        unique: true
    }
}, {
    timestamps: true
});

// Apply the auto-increment plugin to productSchema
productSchema.plugin(AutoIncrement, { inc_field: 'productId' });

module.exports = mongoose.model('Product', productSchema);
