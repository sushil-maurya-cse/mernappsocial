const express = require("express");
const app = express();
var path = require("path");
const User = require("./models/User");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const router = express.Router();

const cors = require('cors')

dotenv.config();

const port = process.env.PORT || 8800;

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors())
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.post("/posing", async (req, res) => {
  console.log(req.body.username)
});
/* 
if ( process.env.NODE_ENV == "production")
{ app.use(express.static("client/build")); 
const path = require("path");
  app.get("*", (req, res) =>{ 
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
  })
}
 */

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
 
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    if("/api/posts/"){
       // do nothing .. 
    }
    else{
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    }  });
}

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(port, () => {
  console.log("Server listening on Port", port);
});




