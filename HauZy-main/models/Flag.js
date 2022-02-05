const mongoose = require('mongoose');
const FlagSchema = new mongoose.Schema({
  property_id :  {
    type:mongoose.Schema.Types.ObjectId,
    required: true
  },
  reason: String,
  description : String,
},
{ timestamps:true }
);
module.exports = mongoose.model('Flag', FlagSchema)
