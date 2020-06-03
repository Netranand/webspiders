//const bcrypt = require('bcrypt');
const express = require('express');
//const jwt = require('jsonwebtoken');
const NewUser = require('../models/newUserModel');
const router = new express.Router();

// Get all users
router.get('/', async (req, res) => {
  const newusers = await NewUser.find();
  res.status(200).json(newusers);
});

// Sign up a user



router.post('/', async (req, res) => {
  const newUser = new NewUser({
    //createdAt: new Date().getTime(),

    user_name: req.body.user_name,
    contact_no: req.body.contact_no,
    address: req.body.address,
    
  });
  try {
    const newuser = await newUser.save();
    return res.status(201).json(newuser);
  } catch (err) {
    return res.status(400).send(err);
  }
});



router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await NewUser.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The User was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeUser = await NewUser.findByIdAndRemove(req.params.id);
     res.send({ message: 'The User was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


module.exports = router;
