const mongoose = require("mongoose");

const ASchema = new mongoose.Schema({
 
  doctorRegisterNo: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  
  
});

const Aform = mongoose.model("appointments", ASchema);

module.exports = Aform;
