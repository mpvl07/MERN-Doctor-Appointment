const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  stateCouncilName: {
    type: String,
    required: true,
  },
  experiences: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  specialization:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  doctorRegisterNo: {
    type: String,
    required: true,
  },
  // Assuming the file is stored in the database as well
  file: {
    type: String,
    required: true,
  },
});

  
   

const Doctors = mongoose.model("doctors", userSchema);
module.exports = Doctors;
