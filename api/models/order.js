//we install mongoose-sequence to auto-increment order id

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // to get the product details
    quantity: {
        type: Number,
        default: 1
    },
    orderNumber: { type: Number, unique: true } // Auto-incrementing field
});

// Apply the auto-increment plugin to orderSchema
orderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });

module.exports = mongoose.model('Order', orderSchema);
