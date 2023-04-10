import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/media", express.static(path.join(__dirname + "/media")));

// app.use(express.static('media/'))

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}))

mongoose
  .connect("mongodb+srv://kairavpatel:Syncmaster152s@medicare-app.jkgp4aw.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { // Successfully connected
    console.log("DB is Connected.");
  })
  .catch((err) => {
    // Catch any potential error
    console.log(mongoose.version);
    console.log("Unable to connect to MongoDB. Error: " + err);
  });

const SECRET_KEY = "xhYkK5F3F32PYvI5Ub4c3essI3uxJtid"

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, SECRET_KEY, { expiresIn: "3d" });
};

const userSchema = new mongoose.Schema({
  Fullname: String,
  Email: String,
  Mobilenumber: String,
  role: String,
  password: String
})
const User = new mongoose.model("User", userSchema)


const PProfile = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Fullname: String,
  date_of_birth: Date,
  gender: String,
  Address: String,
  Mobilenumber: String,
  Email: String,
  Emergency_name: String,
  Emergency_number: String,
  profilephoto: String,
})
const PatientProfile = new mongoose.model("PatientProfile", PProfile)


const diseasesSchema = new mongoose.Schema({
  dname: String,
  symptoms: Array,
  description: String
})
const Diseases = new mongoose.model("Diseases", diseasesSchema)

const PatientInsuranceDetails = new mongoose.Schema({
  patient_id: String,
  CompanyName: String,
  PolicyNumber: String
})
const PatientInsurance = new mongoose.model("PatientInsurance", PatientInsuranceDetails)

//Routes
app.post("/Login", async (req, res) => {
  const { Email, password } = req.body
  const user_info = await User.findOne({ Email });
  if (user_info) {
    // console.log("----- Record Found")
    const passOk = bcrypt.compareSync(password, user_info.password)
    if (passOk) {
      jwt.sign(
        { email: user_info.Email, id: user_info._id },
        SECRET_KEY,
        {},
        (err, token) => {
          if (err) throw err;
          // console.log("____Token Print", token)
          // console.log("user_info Print", user_info)
          res.cookie("token", token).json({ message: "Successfully Login!", user_info, token });
        }
      );
      // return res.send({ message: "Successfully Login!", user: check })
    } else {
      return res.send({ message: "Incorrect Password" })
    }
  } else {
    return res.send({ message: "User Not Registered!" })
  }
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  // console.log("Token = ", token)
  if (token) {
    jwt.verify(token, SECRET_KEY, {}, async (err, userData) => {
      // console.log("User is", userData)
      if (err) throw err;
      const userInfo = await User.findById(userData.id);
      // console.log("----1---", userInfo)
      res.json(userInfo);
    });
  } else {
    res.status(422).json("Pass not Ok");
  }
});

app.post("/Signup", async (req, res) => {
  const { Fullname, Email, Mobilenumber, role, password } = req.body
  console.log("Signup is Called.", req.cookies)
  const salt = await bcrypt.genSalt(10);

  const check = await User.findOne({ Email });
  if (check) {
    return res.send({ message: "User already Registered!" })
  }
  const user_info = await User.create({
    Fullname,
    Email,
    Mobilenumber,
    role,
    password: bcrypt.hashSync(password, salt)
  }).then((response => {
    const token = createToken(response)
    // console.log("Here Respone ----", response)
    // console.log("Here Token ----", token)
    // console.log("Here USER INFO ----", user_info)
    res.status(200).json({ message: "User Registered Successfully!", response, token })
  })).catch("Error Signup!");

  // user_info.save().then(() => {
  //   return res.send({ message: "Successfully Registered!", user_info, token })
  // })
})

app.post("/addPatientProfile", async (req, res) => {
  const { patient_id, Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Emergency_name, Emergency_number } = req.body
  const checkPatientProfile = await PatientProfile.findOne({ patient_id })
  if (checkPatientProfile) {
    return res.send({ message: "Record already Found!" })
  }
  const patient_profile = new PatientProfile({
    patient_id,
    Fullname,
    date_of_birth,
    gender,
    Address,
    Mobilenumber,
    Email,
    Emergency_name,
    Emergency_number
  });
  patient_profile.save().then(() => {
    return res.send({ message: "Your Record is successfully Submited!" })
  })
})

app.put("/updatePatientProfile", async (req, res) => {
  console.log(req.body)
  const { patient_id, Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Emergency_name, Emergency_number, profilephoto } = req.body

  const userFind = req.body.patient_id
  const updateValues = { Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Emergency_name, Emergency_number, profilephoto }

  await PatientProfile.findOneAndUpdate(userFind, updateValues);
  return res.send({ message: "Your Record is successfully Updated!" })

})

app.post("/addInsuranceData", async (req, res) => {
  const { patient_id, CompanyName, PolicyNumber } = req.body
  const InsuranceData = new PatientInsurance({
    patient_id,
    CompanyName,
    PolicyNumber
  });
  InsuranceData.save().then(() => {
    return res.send({ message: "Your Insurance Details is successfully Added!" })
  })
})

app.put("/updateInsuranceData", async (req, res) => {
  const { patient_id, CompanyName, PolicyNumber } = req.body
  const userFind = req.body.patient_id
  const updateValues = { patient_id, CompanyName, PolicyNumber }
  await PatientInsurance.findOneAndUpdate(userFind, updateValues);
  return res.send({ message: "Your Insurance Details is successfully Updated!" })
})

app.get("/GetInsuranceData", (req, res) => {
  const { token } = req.cookies
  // console.log(token)
  if (token) {
    jwt.verify(token, SECRET_KEY, {}, async (err, userData) => {
      // console.log("User is", userData)
      if (err) throw err;
      const userInfo = await PatientInsurance.findOne({ patient_id: userData.id });
      // console.log("----1---", userInfo)
      res.json(userInfo);
    });
  }
})

app.get("/GetPatientProfile", (req, res) => {
  const { token } = req.cookies
  // console.log(token)
  if (token) {
    jwt.verify(token, SECRET_KEY, {}, async (err, userData) => {
      // console.log("User is", userData)
      if (err) throw err;
      const userInfo = await PatientProfile.findOne({ patient_id: userData.id });
      // console.log("----1---", userInfo)
      res.json(userInfo);
    });
  }

  // PatientProfile.find({})
  //   .then((data) => {
  //     // const jsonContent = JSON.stringify(data)
  //     return res.send(data)
  //   })
  //   .catch(err => {
  //     console.log("Error : ", err)
  //   })
})

app.post("/AddDieases", async (req, res) => {
  const { dname, symptoms, description } = req.body
  const checkdiseases = await Diseases.findOne({ dname })
  if (checkdiseases) {
    return res.send({ message: "Diseases already Registered!" })
  }
  const diseases_info = new Diseases({
    dname,
    symptoms,
    description
  });
  diseases_info.save().then(() => {
    return res.send({ message: "Your Diseases is successfully Submited!" })
  })
})

app.get("/GetDieases", (req, res) => {
  Diseases.find({})
    .then((data) => {
      // const jsonContent = JSON.stringify(data)
      return res.send({ data })
    })
    .catch(err => {
      console.log("Error : ", err)
    })
})

app.get("/GetDoctors", (req, res) => {
  User.find({role: "Doctor"})
    .then((data) => {
      // const jsonContent = JSON.stringify(data)
      return res.send(data)
    })
    .catch(err => {
      console.log("Error : ", err)
    })
})



// Set up Multer middleware to handle the file upload
const storage = multer.diskStorage({
  destination: 'media/',
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Define a POST endpoint to handle the image upload
app.post('/profilephoto', upload.single('photos'), (req, res) => {
  try {
    // Get the uploaded file information from the request object
    const file = req.file;

    // Handle the uploaded file as needed (e.g. store it in a database, return metadata, etc.)
    const response = {
      filename: file.filename,
      imageUrl: `http://localhost:9002/${file.path}`
    };

    console.log(response.imageUrl)

    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    // Return a success response with the file information
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(9002, () => {
  console.log("BE started at port 9002")
})