const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv=require('dotenv');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const UserModel = require("./models/Users");
const authenticate=require("./middleware/authenticate");
const bookingRouter = require("./routes/Bookingroute");
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the actual domain of your frontend
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 204,
};
dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
mongoose
.connect(
`mongodb+srv://vetaledurvesh06:$tr0nGarrmsa@cluster1.ovrr3oh.mongodb.net/bookshow?retryWrites=true&w=majority`
)
.then(() =>
app.listen(5000, () =>
    console.log("Connected To Database And Server is running")
)
)
.catch((e) => console.log(e));
app.post("/login", async (req, res) => {
    let success=false;
    try{
    const {email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({error:"Plz Filled the data"})
    }
    const userLogin = await UserModel.findOne({ email: email });
    if(userLogin){
      const isMatch=await bcrypt.compare(password,userLogin.password);
      const token = await userLogin.generateAuthToken();
      success=true;
      if (!isMatch){
        success=false;
        res.status(400).json({ error: "Invalid Credentials" });
      }
      else{
        // res.status(200).json({});
  
      res.status(200).json({ success:true, token ,message: "user Signin Successfully" });
      }
    }else{
      success=false;
      res.status(400).json({ error: "Invalid Credentials" });
    }
  }catch (err) {
    console. log(err);
    res.send("error") ;
  }
  });
  app.post("/register", async (req, res) => {
    const {name,email,phoneno,password,gndr} =req.body;
    if(!name || !email || !phoneno || !password || !gndr){
      return res.status(422).json({error:"plz fill the fields properly"})
    }
      try {
          const userExist= await UserModel.findOne({email:email});
          if(userExist){
            return res.status(422).json({error:"Email already Exist"});
          }
          const user=new UserModel({name,email,phoneno,password,gndr});
          
          await user.save();
          res.status(201).json({message:"User Registered Successfully"});
      } catch (err) {
          console.log(err);
      }
  });
  app.get('/about', authenticate,async (req, res) => {
    try{
      userId=req.user;
      const user=await UserModel.findById(userId).select("-password")
      res.send(user);
    }catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  app.use("/api/bookings", bookingRouter);
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
  