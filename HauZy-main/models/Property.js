const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
  owner : {
    type:mongoose.Schema.Types.ObjectId,
    required: true
  },
  status : String,
  price : Number,
  state : String,
  city : String,
  address : String,
  type : String,
  image_url : String,
},
{ timestamps: true }
);


module.exports = mongoose.model('Property', PropertySchema)
