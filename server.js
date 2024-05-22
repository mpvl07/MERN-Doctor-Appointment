const express=require("express");
const app=express();
const cors=require('cors');
app.use(cors());
require('dotenv').config()
const dbConfig=require("./config/dbConfig");
app.use(express.json());
const userRoute=require("./routes/userRoute")

app.use('/api/user',userRoute);
const port=process.env.PORT||3004;

app.listen(3004, () => console.log("listening on port "+port));