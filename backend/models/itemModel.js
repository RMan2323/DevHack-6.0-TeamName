const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    category: {
        type: String,
        enum: ['Electronics', 'Books', 'Furniture', 'Clothing', 'Other'],
        default: 'Other'
    },
    condition: {
        type: String,
        enum: ['New', 'Like New', 'Used', 'Damaged'],
        default: 'Used'
    },
    imageUrl: {
        type: String,
        default: '/images/default-item.jpg'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Item', itemSchema);
