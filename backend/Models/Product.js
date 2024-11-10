const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  description: { 
    type: String, 
    required: true, 
  },
  category: { 
    type: String, 
    required: true, 
    trim: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);