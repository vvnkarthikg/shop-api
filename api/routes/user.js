//passwords must be encrypted, so use bcrypt
//bcrypt operation is irreversible

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const user = require("../models/user");

router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({ message: 'Error hashing password' });
        }
    
        const newUser = new User({
          email:req.body.email,
          password: hash,
        });
    
        newUser
          .save()
          .then(() => {
            res.status(201).json({ message: 'User created successfully' });
          })
          .catch((err) => {
            if (err.code === 11000) { // MongoDB duplicate key error code
              return res.status(409).json({ message: 'Email already exists' });
            }
            console.log(err);
            res.status(500).json({ error: 'Error saving user' });
          });
      });
});


router.delete('/:userId',async(req,res)=>{
    try {
        const { userId } = req.params.userId;
        const deleted = await Product.findByIdAndDelete(userId);

        if (!deleted) {
            return res.status(404).send({ message: 'user not found' });
        }

        res.status(200).send({ message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



module.exports = router;
