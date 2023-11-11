

const express = require("express");
const mongoose = require("mongoose")
const multer=require('multer')
const path = require("path");

require("dotenv").config()

const routes = require("./routes/authRoutes");

const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000

//Middleware
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(express.json())
app.use(cors())

 
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected...."))
.catch((err) => console.log(err));

// app.use("/api", routes);
app.use(routes);



// Add the following Firebase imports
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes ,getDownloadURL } = require("firebase/storage");

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,

};



const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const uploadToFirebase = async (file, fileName) => {
  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, file.buffer);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};


// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

//firebase upload image
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const originalFileName = req.file.originalname;
    const fileExtension = path.extname(originalFileName);
    const timestamp = Date.now();
    const fileName = `${path.parse(originalFileName).name}_${timestamp}.png`;

    const imageUrl = await uploadToFirebase(req.file, fileName);

    if (imageUrl) {
      res.status(200).json({ message: "Image has been uploaded to Firebase successfully", imageUrl });
    } else {
      res.status(500).json("Error getting image URL from Firebase");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error uploading image to Firebase");
  }
});


 
app.listen(PORT, () => console.log(`Listening at ${PORT}...`));






 