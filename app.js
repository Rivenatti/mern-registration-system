//----- App initialization
const express = require("express");
const app = express();

//----- Morgan HTTP request logger middleware
const morgan = require("morgan");
app.use(morgan("dev"));

//----- Enable body parsing of incoming requests
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//----- Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//----- MongoDB connection
const mongoose = require("mongoose");
const MongoDB = require("./config/mongoDB");

mongoose.set("useCreateIndex", true); // Fix DeprecationWarning
mongoose.connect(
  // connect from local config file or hosting platform
  MongoDB,
  { useNewUrlParser: true },
  () => console.log("MongoDB connected...")
);

//----- Routing

// Homepage route
app.get("/", (req, res) => res.send("Home"));

// Sign up route
const signUpRoute = require("./api/routes/signup");
app.use("/", signUpRoute);

// Sign in route
const signInRoute = require("./api/routes/signin");
app.use("/", signInRoute);

// Delete route
const deleteRoute = require("./api/routes/delete");
app.use("/delete", deleteRoute);

//----- Error handling routes
app.use((req, res, next) => {
  const error = new Error("Error 404: Page not found.");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

//----- Heroku server
if (process.env.NODE_ENV !== "development") {
  const path = require("path");

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    console.log(__dirname);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
