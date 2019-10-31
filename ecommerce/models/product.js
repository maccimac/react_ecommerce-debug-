//THIS IS OUR USER SCHEMA
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxlength: 32
  },
  description: {
    type: String,
    trim: true,
    require: false,
    maxlength: 2000
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32
  },
  category: {
    type: ObjectId,
    refer: 'Category',
    required: true
  },
  quantity: {
    type: Number
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  shipping: {
    required: false,
    type: Boolean
  },
  sold: {
    type: Number,
    default: 0

  }

}, {timestamps: true})



module.exports = mongoose.model("Product", productSchema);
