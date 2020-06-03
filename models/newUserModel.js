const mongoose = require('mongoose');

const { Schema } = mongoose;

const NewUserSchema = new Schema({
 
  user_name: {
    type: String,
    required: true
  },
  contact_no: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  
 
});

module.exports = mongoose.model('NewUser', NewUserSchema);
