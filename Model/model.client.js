const mongoose = require('mongoose');


const commentaireSchema = mongoose.Schema({
  _id:Number,
  First_Name: String,
  Last_Name: String,
  Email: String,
  Mobile:Number
}, {
  timestamps: true
});




  module.exports=mongoose.model('commentaire',commentaireSchema)