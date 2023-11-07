const Product = require('../models/product');
const User = require("../models/userModel");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Services = require("../models/service");

exports.getStatitics = async(req,res) =>{
    try {
        const userCount = await User.countDocuments();
        const postCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const subcategoryCount = await SubCategory.countDocuments();
        const services = await Services.countDocuments();
        const statistics = {
          users: userCount,
          Products: postCount,
          categories: categoryCount,
          subcategories: subcategoryCount,
          services:services
        };
    
        res.json(statistics);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}