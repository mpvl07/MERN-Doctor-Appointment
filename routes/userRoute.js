const express=require('express');
const router=express.Router();
const User=require("../models/userModel");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const authMiddleware=require("../middlewares/authMiddleware");
const DAform = require('../models/doctorModel');
const Aform=require('../models/appointments')
const Doctors=require('../models/doctors');
const multer = require("multer");
const Rform = require("../models/review");
const Commentform=require("../models/comments")

const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

router.post('/register',async(req,res)=>{
    try{
        const userExists=await User.findOne({email:req.body.email});
        if(userExists){
            return res.status(200).send({message:"User already exits",success:false});
        }
        const password=req.body.password;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        req.body.password=hashedPassword;
        const newuser=new User(req.body);
        await newuser.save();
        res.status(200).send({message:"user created",success:true});
    }catch(error){
        res.status(500).send({message:"Error creating user",success:false,error});    
    }
})
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //const doct = await Doctors.findOne({ email: req.body.email });

    if (!user ) {
      return res
        .status(200)
        .send({ message: "User not exist", success: false });
    }

    // if (doct) {
    //   res.redirect("/doctors");
    // }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is not correct", success: false });
    } else {
      // if (user.email === "admin@gmail.com") {
      //   res.redirect("/admin");
      // } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .send({ message: "Login successful", success: true, data: token });
      
    }
  } catch (error) {
    res.status(500).send({ message: "Error in login", success: false, error });
  }
});
router.post("/appointments", async (req, res) => {
  try {
    const newDoctor = new Aform({
     
      doctorRegisterNo: req.body.doctorRegisterNo,
      email:req.body.email,
      date: req.body.date,
      timeSlot: req.body.timeSlot,
      
      //file: req.body.file, // Assuming you're storing the file path
    });
    await newDoctor.save();
    console.log("Appointment created:", newDoctor);
    res
      .status(200)
      .json({ message: "Appointment created successfully", success: true });
  } catch (error) {
    console.log(error);
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Error creating appointment", success: false });
  }
});
router.get("/availableSlots", async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    console.log("doctorId",doctorId)
    if (!doctorId || !date) {
      return res
        .status(400)
        .json({ message: "Invalid request parameters", success: false });
    }

    const existingAppointments = await Aform.find({
      doctorRegisterNo: doctorId,
      date: date,
    });

    const allSlots = [
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ];

    const bookedSlots = existingAppointments.map(
      (appointment) => appointment.timeSlot
    );
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );
    console.log("slots",availableSlots)
    res.status(200).json({ date, availableSlots, success: true });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res
      .status(500)
      .json({ message: "Error fetching available slots", success: false });
  }
});
router.get("/DAformdata", async (req, res) => {
  try {
    const doctorRegisterNo = req.query.doctorRegisterNo; // Assuming the doctorRegisterNo is passed as a query parameter

    // Find the doctor in the database based on the doctorRegisterNo
    const doctor = await DAform.findOne({ doctorRegisterNo });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Return the doctor's data
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctors.find();
    console.log("in router",doctors)
    res.status(200).json({ doctors, success: true });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors", success: false });
  }
});


router.post("/doctors",async (req, res) => {
  try {
    const {
      name,
      location,
      stateCouncilName,
      experiences,
      specialization,
      qualifications,
      email,
      doctorRegisterNo,
      file
    } = req.body;
    
    const newDoctor = new Doctors({
      name,
      location,
      stateCouncilName,
      experiences,
      specialization,
      qualifications,
      email,
      doctorRegisterNo,
      file
    });
    await newDoctor.save();
    console.log("Doctor created:", newDoctor);
    res
      .status(200)
      .json({ message: "Doctor created successfully", success: true });
  } catch (error) {
    console.log(error)
    console.error("Error creating doctor:", error);
    res.status(500).json({ message: "Error creating doctor", success: false });
  }
});
router.post('/get-user-info-by-id',authMiddleware,async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.body.userId});
        if(!user){
            return res.status(200).send({message:"User not exist",success:false});
        }else{
            res.status(200).send({success:true,data:{
                name:user.name,
                email:user.email,
            }})
        }
    }catch(error){
        res.status(500).send({message:"Error getting user info",success:false,error})
    }
})
// Fetch details of a specific doctor
router.get("/doctors/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctors.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Error fetching doctor" });
  }
});

router.get("/data", async (req, res) => {
  try {
    // Fetch data from the 'data' collection
    const data = await DAform.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.delete("/deleteDoctor/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    await DAform.findByIdAndDelete(doctorId);
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ error: "Error deleting doctor" });
  }
});



router.post("/applyform", upload.single("file"), async (req, res) => {
  const {
    name,
    location,
    stateCouncilName,
    experiences,
    specialization,
    qualifications,
    email,
    doctorRegisterNo,
  } = req.body;
  const file = req.file;
  const newDoctor = new DAform({
    name,
    location,
    stateCouncilName,
    specialization,
    experiences,
    qualifications,
    email,
    doctorRegisterNo,
    file: file.filename,
  });
  await newDoctor.save();
  // Here, you would save the form data to your database

  res.send("Data received");
});
router.post("/get-doctor-id", async (req, res) => {
  const { email } = req.body;

  try {
    // Assuming you're using Mongoose for MongoDB
    const doctor = await Doctors.findOne({ email: email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ doctorId: doctor.doctorRegisterNo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/appointments/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  try {
    const appointments = await Aform.find({ doctorRegisterNo: doctorId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/check-doctor", async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await Doctors.findOne({ email });
    if (doctor) {
      res.json({ isDoctor: true });
    } else {
      res.json({ isDoctor: false });
    }
  } catch (error) {
    console.error("Error checking if user is a doctor:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/appointment/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const userAppointments = await Aform.find({ email });
    console.log("userAppointments:", userAppointments);

    const currentDate = new Date();

    // Separate appointments into past and future
    const pastAppointments = userAppointments.filter(
      (appointment) =>
        new Date(appointment.date).getTime() < currentDate.getTime()
    );
    const futureAppointments = userAppointments.filter(
      (appointment) =>
        new Date(appointment.date).getTime() >= currentDate.getTime()
    );

    console.log("past", pastAppointments);
    console.log("future", futureAppointments);

    res
      .status(200)
      .json({ past: pastAppointments, future: futureAppointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});





// router.get("/appoitments/:email", async (req, res) => {
//   const email = req.params.email;
//   try {
//     const appointments = await Aform.find({ email });
//     res.json(appointments);
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
router.put("/:doctorRegisterNo/rating", async (req, res) => {
  const doctorRegisterNo = req.params.doctorRegisterNo;
  const newRating = req.body.rating;
  try {
    let rating = await Rform.findOne({ doctorRegisterNo });

    if (!rating) {
      rating = new Rform({ doctorRegisterNo });
    }

    rating.rating =
      (rating.rating * rating.ratingCount + newRating) /
      (rating.ratingCount + 1);
    rating.ratingCount += 1;

    await rating.save();

    res.json(rating);
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/appointments/review", async (req, res) => {
  const { doctorRegisterNo, rating,email, comment } = req.body;

  try {
    // Find or create a rating entry for the doctor
    let ratingEntry = await Rform.findOne({ doctorRegisterNo });
    if (!ratingEntry) {
      ratingEntry = new Rform({ doctorRegisterNo });
    }

    // Update the rating based on the previous rating and count
    const prevRating = ratingEntry.rating || 0;
    const prevRatingCount = ratingEntry.ratingCount || 0;
    const newRating =
      (prevRating * prevRatingCount + rating) / (prevRatingCount + 1);

    // Update the rating entry
    ratingEntry.rating = newRating;
    ratingEntry.ratingCount = prevRatingCount + 1;
    await ratingEntry.save();

    // Save the comment
    const commentEntry = new Commentform({
      doctorRegisterNo,
      email,
      comment,
    });
    await commentEntry.save();

    res.status(200).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
});
router.get("/ratings/:doctorRegisterNo", async (req, res) => {
  try {
    const doctorRegisterNo = req.params.doctorRegisterNo;
    const ratings = await Rform.findOne({ doctorRegisterNo: doctorRegisterNo });
    if (!ratings) {
      return res
        .status(404)
        .json({ message: "No ratings found for this doctor." });
    }
    res.json({ ratings });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/comments/:doctorRegisterNo", async (req, res) => {
  try {
    const comments = await Commentform.find({
      doctorRegisterNo: req.params.doctorRegisterNo,
    });
    res.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});


// router.post("/api/user/applyform", upload.single("file"), async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       doctorRegisterNo,
//       stateCouncilName,
//       specialization,
//       timings,
//     } = req.body;
//     const file = req.file; // Uploaded file

//     // Create new Doctor document
//     const newDoctor = new DAform({
//       name,
//       email,
//       doctorRegisterNo,
//       stateCouncilName,
//       specialization,
//       timings,
//       file: file.buffer, // Save the file buffer to the database
//     });

//     // Save the newDoctor document to the database
//     await newDoctor.save();

//     res.json({
//       success: true,
//       message: "Doctor application submitted successfully",
//     });
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Failed to submit form. Please try again.",
//       });
//   }
// });

// router.post(
//   "/applyform",
//   (req, res, next) => {
//     upload.single("file")(req, res, (err) => {
//       console.log("welcome");
//       if (err) {
//         console.error("Multer error:", err);
//         return res
//           .status(400)
//           .send({ message: "Error uploading file", success: false });
//       }
//       // Check if req.file is defined

//       next();
//     });
//   },
//   async (req, res) => {
//     try {
//       console.log(req.file);
//       console.log("Helooo");
//       // Check again if req.file is defined before accessing its properties
//       if (!req.file) {
//         return res
//           .status(400)
//           .send({ message: "No file uploaded", success: false });
//       }
//       const newDoctor = new DAform({
//         name: req.body.name,
//         email: req.body.email,
//         doctorRegisterNo: req.body.doctorRegisterNo,
//         stateCouncilName: req.body.stateCouncilName,
//         specialization: req.body.specialization,
//         timings: req.body.timings,
//         file: req.file.filename, // Use req.file.filename to get the filename
//       });
//       await newDoctor.save();
//       console.log(newDoctor);
//       res
//         .status(200)
//         .send({ message: "Doctor created success", success: true });
//     } catch (error) {
//       console.error("Error creating doctor:", error);
//       res
//         .status(500)
//         .send({ message: "Error creating doctor", success: false });
//     }
//   }
// );


// router.post("/applyform", upload.single("image"), async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
//     console.log("File path:", req.file.path);
//     console.log(req.body)
//     const newDoctor = new DAform({
//       name: req.body.name,
//       doctorRegisterNo: req.body.doctorRegisterNo,
//       stateCouncilName: req.body.stateCouncilName,
//       specialization: req.body.specialization,
//       timings: req.body.timings,
//       image: req.file.filename, // Multer saves the file to req.file.path
      
//     });
//     await newDoctor.save();
//     res.status(200).send({ message: "Doctor created success", success: true });
//   } catch (error) {
//     console.error("Error creating doctor:", error);
//     res.status(500).send({ message: "Error creating doctor", success: false });
//   }
// });



// // router.post("/applyform", async (req, res) => {
// //   try {
    
    
// //     const newdoctor = new DAform(req.body);
// //     await newdoctor.save();
// //     // const adminUser=await User.findOne({isAdmin:true});

// //     // const unseenNotifications = adminUser.unseenNotifications
// //     // unseenNotifications.push({
// //     //     type:"new-doctor-request",
// //     //     message:`${newdoctor.doctorRegisterNo} has applied`,
// //     //     data:{
// //     //         doctorId:newdoctor.doctorRegisterNo,
            
// //     //     },
// //     //     onClickPath:"/admin"
// //     // })
// //     res.status(200).send({ message: "doctor created", success: true });
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .send({ message: "Error creating doctor", success: false, error });
// //   }
// // });

module.exports=router;