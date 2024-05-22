const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  doctorRegisterNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
 
  comment: {
    type: String,
    required: true,
  },
});
const Commentform = mongoose.model("comments", commentSchema);

module.exports = Commentform;