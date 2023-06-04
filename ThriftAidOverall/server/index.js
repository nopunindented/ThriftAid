const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const MONGO_URL = 'mongodb+srv://mufiaz:skIF1Y525tbDj9mT@thriftaid.oankunu.mongodb.net/?retryWrites=true&w=majority';
const PORT = 4000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable sending cookies in cross-origin requests
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
