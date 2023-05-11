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


const DProfile = new mongoose.Schema({
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Fullname: String,
  date_of_birth: Date,
  gender: String,
  Address: String,
  Mobilenumber: String,
  Email: String,
  Medical_Qualification: String,
  Specialist: String,
  zoom_id: String,
  profilephoto: String,
})
const DoctorProfile = new mongoose.model("DoctorProfile", DProfile)

const doctorAvailability = new mongoose.Schema({
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  monday: {
    starttime: String,
    endtime: String,
    dayoff: Boolean
  },
  tuesday: {
    starttime: String,
    endtime: String,
    dayoff: Boolean
  },
  wednesday: {
    starttime: String,
    endtime: String,
    dayoff: Boolean
  },
  thursday: {
    starttime: String,
    endtime: String,
    dayoff: Boolean
  },
  friday: {
    starttime: String,
    endtime: String,
    dayoff: Boolean
  },
  saturday: {
    starttime: String,
    endtime: String,
    dayoff: Boolean
  },
  sunday: {
    starttime: String,
    endtime: String,
    dayoff: Boolean
  }
})
const DoctorAvailability = new mongoose.model("DoctorAvailability", doctorAvailability)

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

const AppointmentDetails = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patient_name: String,
  patient_Mobilenumber: String,
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor_name: String,
  doctor_spec: String,
  appointment_date: String,
  appointment_time: String,
  reason: String,
  appointment_status: String,
  zoom_id: String,
})
const Appointment = new mongoose.model("Appointment", AppointmentDetails)

const MedicalRecord = new mongoose.Schema({
  doctor_id: String,
  doctor_name: String,
  doctor_spec: String,
  patient_id: String,
  date: String,
  disease_name: String,
  description: String,
  Files: [],
})
const PatientMedicalRecord = new mongoose.model("PatientMedicalRecord", MedicalRecord)



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
  const { patient_id, Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Emergency_name, Emergency_number, profilephoto } = req.body
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
    Emergency_number,
    profilephoto
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
})

app.post("/addDoctorProfile", async (req, res) => {
  const { doctor_id, Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Medical_Qualification, Specialist, zoom_id } = req.body
  const doctor_profile = new DoctorProfile({
    doctor_id,
    Fullname,
    date_of_birth,
    gender,
    Address,
    Mobilenumber,
    Email,
    Medical_Qualification,
    Specialist,
    zoom_id
  });
  doctor_profile.save().then(() => {
    return res.send({ message: "Your Record is successfully Submited!" })
  })
})

app.put("/updateDoctorProfile", async (req, res) => {


  const { doctor_id, Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Medical_Qualification, Specialist, zoom_id, profilephoto } = req.body

  const userFind = req.body.doctor_id
  const updateValues = { Fullname, date_of_birth, gender, Address, Mobilenumber, Email, Medical_Qualification, Specialist, zoom_id, profilephoto }

  await DoctorProfile.findOneAndUpdate(userFind, updateValues);
  return res.send({ message: "Your Record is successfully Updated!" })

})

app.post("/adddoctorAvailability", async (req, res) => {
  const { doctor_id, monday, tuesday, wednessday, thrusday, friday, saturday, sunday } = req.body
  const doctor_availability = new DoctorAvailability({
    doctor_id,
    monday, tuesday, wednessday, thrusday, friday, saturday, sunday
  });
  doctor_availability.save().then(() => {
    return res.send({ message: "Your Availability is successfully Submited!" })
  })
})

app.get("/GetdoctorAvailability", (req, res) => {
  const { token } = req.cookies
  // console.log(token)
  if (token) {
    jwt.verify(token, SECRET_KEY, {}, async (err, userData) => {
      // console.log("User is", userData)
      if (err) throw err;
      const userInfo = await DoctorAvailability.findOne({ doctor_id: userData.id });
      // console.log("----1---", userInfo)
      res.json(userInfo);
    });
  }
})

app.put("/updatedoctorAvailability", async (req, res) => {
  console.log(req.body)
  const { doctor_id, monday, tuesday, wednessday, thrusday, friday, saturday, sunday } = req.body

  const userFind = req.body.doctor_id
  const updateValues = { monday, tuesday, wednessday, thrusday, friday, saturday, sunday }

  await DoctorAvailability.findOneAndUpdate(userFind, updateValues);
  return res.send({ message: "Your Availability is successfully Updated!" })

})

app.put("/updateInsuranceData", async (req, res) => {
  const { patient_id, CompanyName, PolicyNumber } = req.body
  const userFind = req.body.patient_id
  const updateValues = { patient_id, CompanyName, PolicyNumber }
  await PatientInsurance.findOneAndUpdate(userFind, updateValues);
  return res.send({ message: "Your Insurance Details is successfully Updated!" })
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

app.get("/GetDoctorProfile/:id", async (req, res) => {
  const { id } = req.params
  if (id) {
    await DoctorProfile.findOne({ doctor_id: id })
      .then((data) => {
        return res.send(data)
      })
  }
})

app.get("/GetDoctorProfile", (req, res) => {
  const { token } = req.cookies
  // console.log(token)
  if (token) {
    jwt.verify(token, SECRET_KEY, {}, async (err, userData) => {
      // console.log("User is", userData)
      if (err) throw err;
      const userInfo = await DoctorProfile.findOne({ doctor_id: userData.id });
      // console.log("----1---", userInfo)
      res.json(userInfo);
    });
  }
})

app.get("/GetAllDoctorProfile", (req, res) => {
  DoctorProfile.find({})
    .then((data) => {
      // const jsonContent = JSON.stringify(data)
      return res.send(data)
    })
    .catch(err => {
      console.log("Error : ", err)
    })
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
  User.find({ role: "Doctor" })
    .then((data) => {
      // const jsonContent = JSON.stringify(data)
      return res.send(data)
    })
    .catch(err => {
      console.log("Error : ", err)
    })
})

app.get("/DoctorAvailability/:id", async (req, res) => {
  const { id } = req.params
  // console.log(token)
  if (id) {
    await DoctorAvailability.findOne({ doctor_id: id })
      .then((data) => {
        return res.send(data)
      })
  }
})

app.get("/GetPatientDetails/:id", async (req, res) => {
  const { id } = req.params
  // console.log(token)
  if (id) {
    await PatientProfile.findOne({ patient_id: id })
      .then((data) => {
        return res.send(data)
      })
  }
})



app.post("/MakeAppointment", async (req, res) => {
  const { patient_id, patient_name, patient_Mobilenumber, doctor_id, doctor_name, doctor_spec, appointment_date, appointment_time, reason, appointment_status, zoom_id } = req.body
  const MakeAppointment = await new Appointment({
    patient_id, patient_name, patient_Mobilenumber, doctor_id, doctor_name, doctor_spec, appointment_date, appointment_time, reason, appointment_status, zoom_id
  });
  MakeAppointment.save().then(() => {
    return res.send({ message: "Your Appointment is successfully Created!" })
  })
})

app.put("/ChangeAppStatus", async (req, res) => {
  const { appointment_status } = req.body
  const FindValue = { patient_id: req.body.patient_id, appointment_date: req.body.appointment_date, appointment_time: req.body.appointment_time }
  const UpdateValues = { appointment_status }
  await Appointment.findOneAndUpdate(FindValue, UpdateValues)
  return res.send({ message: `Your Appointment has been ${appointment_status}!` })
})

app.get("/GetPatientAppointments", (req, res) => {
  const { token } = req.cookies
  // console.log(token)
  if (token) {
    jwt.verify(token, SECRET_KEY, {}, async (err, userData) => {
      // console.log("User is", userData)
      if (err) throw err;
      const userInfo = await Appointment.find({ patient_id: userData.id });
      // console.log("----1---", userInfo)
      res.json(userInfo);
    });
  }
})

app.get("/GetDoctorAppointments", (req, res) => {
  const { token } = req.cookies
  // console.log(token)
  if (token) {
    jwt.verify(token, SECRET_KEY, {}, async (err, userData) => {
      // console.log("User is", userData)
      if (err) throw err;
      const userInfo = await Appointment.find({ doctor_id: userData.id });
      // console.log("----1---", userInfo)
      res.json(userInfo);
    });
  }
})


//ADD or EDIT Profile Photo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/media", express.static(path.join(__dirname + "/media")));

// Set up Multer middleware to handle the file upload
const storage = multer.diskStorage({
  destination: 'media/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname));
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

app.use("/medicalrecords", express.static(path.join(__dirname + "/medicalrecords")));
const FilesMiddleware = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'medicalrecords/')
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname
    const extension = file.originalname.split('.').pop();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const time = new Date().toISOString().slice(11, 19).replace(/:/g, '-');
    const filename = `${originalname.substring(0, originalname.lastIndexOf('.')).replace(/\s+/g, '')}-${date}-${time}`;
    cb(null, filename);
  }
});
const UploadFiles = multer({ storage: FilesMiddleware })


app.post('/AddPatientFiles', UploadFiles.array('photos', 10), (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("medicalrecords/", ""));
  }
  // console.log(uploadFiles)
  res.status(200).json(uploadFiles);
});


app.post("/AddMedicalRecords", async (req, res) => {
  const { doctor_id, doctor_name, doctor_spec, patient_id, date, disease_name, description, Files } = req.body
  const MedicalRecord = await new PatientMedicalRecord({
    doctor_id, doctor_name, doctor_spec, patient_id, date, disease_name, description, Files
  });
  MedicalRecord.save().then(() => {
    return res.send({ message: "Your Record has been successfully Created!" })
  })
})

app.get("/GetMedicalRecords/:id",(req, res) => {
  const { id } = req.params
  if (id) {
    PatientMedicalRecord.find({ patient_id: id })
      .then((data) => {
        return res.send(data)
      })
  }
})

app.get("/GetMedicalRecords/",(req, res) => {
  const { token } = req.cookies
  // console.log(token)
  if (token) {
    jwt.verify(token, SECRET_KEY, {}, async (err, userData) => {
      // console.log("User is", userData)
      if (err) throw err;
      const userInfo = await PatientMedicalRecord.find({ patient_id: userData.id });
      // console.log("----1---", userInfo)
      res.json(userInfo);
    });
  }
})

app.listen(9002, () => {
  console.log("BE started at port 9002")
})