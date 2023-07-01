const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const users = require("./routes/api/users.js");
const postings = require("./routes/api/postings.js"); // Import the postings route
const keys = require("./config/keys");

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = keys.mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Enable CORS
app.use(cors());

// Create a new instance of the session store
const store = new MongoDBStore({
  uri: db,
  collection: "sessions",
});

// Configure the session middleware
app.use(
  session({
    secret: keys.secretOrKey,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Routes
app.use("/api/users", users);
app.use("/api/postings", postings); // Use the postings route

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));
