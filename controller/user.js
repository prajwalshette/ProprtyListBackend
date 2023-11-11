const User = require('../models/User');  
const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { password, ...userInfo } = user._doc;

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
 