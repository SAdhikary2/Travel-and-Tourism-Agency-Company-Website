require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const monmodel = require("./mongodb");
const moment = require("moment"); //to convert date in to string
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./auth");
const methodOverride = require("method-override");

const port = process.env.PORT || 3000;

app.use(methodOverride("_method"));
app.use(cookieParser()); //SETTINGS THE MIDDLE WARE FOR ACCESSING THE COOKIE

// PATH
staticPath = path.join(__dirname, "../public");
viewPath = path.join(__dirname, "../templates/views");
partialPath = path.join(__dirname, "../templates/partials");

//VIEW ENGINE
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//ROUTING`
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//MongoDB connection
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

mongoose
  .connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully"))
  .catch((err) => console.error(err));

// ******************************** For Login and Registration****************************
//DEFINE USER SCHEMA AND MODEL
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//TOKEN GENARATION function define
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      "mynameissukalyanadhikaryiamasoftwareenginner"
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
  } catch (error) {}
};
//registration bcryption middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
    const password = this.password;
  }
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;

//HANDLING THE LOGIN PORTION
app.use(function (req, res, next) {
  res.locals.loggedIn = false; // Set the default value to false
  const token = req.cookies.jwtCookies; // Extract the JWT token from the cookies
  if (token) {
    try {
      res.locals.loggedIn = true; // Set loggedIn to true if the token is valid
    } catch (error) {}
  }
  next();
});

// app.post("/login", async (req, res) => {
//   const { loginname, loginpassword } = req.body;
//   if (loginname === "admin") {
//     const adminPassword = "A@1234"; // replace with your actual admin password
//     if (loginpassword === adminPassword) {
//       res.redirect("admin");
//     } else {
//       res.send("Invalid admin credentials");
//     }
//   } else {
//     const user = await User.findOne({ username: loginname });
//     if (user) {
//       const isMatch = await bcryptjs.compare(loginpassword, user.password);
//       if (isMatch) {
//         const token = await user.generateAuthToken();
//         res.cookie("jwtCookies", token, {
//           httpOnly: true,
//           maxAge: 1800000, // 30 minutes in milliseconds
//         });
//         res.locals.loggedIn = true; // Update the loggedIn status
//         res.render("index"); // Render the index template

//       } else {
//         res.send("Invalid credentials");
//       }
//     }
//   };
// });

app.post("/login", async (req, res) => {
  const { loginname, loginpassword } = req.body;
  const user = await User.findOne({ username: loginname });
  if (user) {
    const isMatch = await bcryptjs.compare(loginpassword, user.password);
    if (isMatch) {
      if (user.username === "admin" && user.role === "admin") {
        res.redirect("admin");
      } else {
        const token = await user.generateAuthToken();
        res.cookie("jwtCookies", token, {
          httpOnly: true,
          maxAge: 1800000, // 30 minutes in milliseconds
        });
        res.locals.loggedIn = true; // Update the loggedIn status
        res.render("index"); // Render the index template
      }
    } else {
      res.send("Invalid credentials");
    }
  } else {
    res.send("User not found");
  }
});

//FOR LOGOUT AND REDIRECT THE CURRENT PAGE
app.get("/logout", (req, res) => {
  const currentPage = req.headers.referer || "/"; // Get the current page URL or set the default to '/'
  res.clearCookie("jwtCookies"); // Clear the jwtCookies cookie
  res.locals.loggedIn = false; // Update the loggedIn status
  res.redirect(currentPage); // Redirect to the current page
  // res.render('index')
});

// HANDLING THE REGISTRATION PORTION
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  //for generating authentication token during registration
  const token = await newUser.generateAuthToken();
  //creating cookies and save to the browser
  res.cookie("jwtCookies", token, {
    httpOnly: true,
    maxAge: 1800000, // 30 minutes in milliseconds
  });
  await newUser.save();
  res.render("login");
});

//SHOWING THE USER DATA IN USER PAGE
app.get("/user", async (req, res) => {
  const users = await User.find({});
  res.render("user", { users });
});

app.get("/edit/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("edit", { user });
});

app.post("/edit/:id", async (req, res) => {
  const { username, email, role } = req.body;
  await User.findByIdAndUpdate(req.params.id, { username, email, role });
  res.redirect("/user");
});

// **************************************for booking ***************************************
app.post("/post", async (req, res) => {
  console.log("inside the post function");
  const data = new monmodel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    destination: req.body.destination,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    numberOfGuests: req.body.numberOfGuests,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    specialRequest: req.body.specialRequest,
  });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "Booking Confirmation",
    text: `Dear ${req.body.firstName},\n\nYou have Booked Successfully ${req.body.destination} tour for ${req.body.numberOfGuests} peoples. \nVery soon you will receive a call for your confirmation and payment.\n\n\n\n\n\n\nStay alert , Stay Updated. \nExplore Teams`, // plain text body
  };
  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error in sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
  const val = await data.save();
  res.redirect("success");
});

app.get("/success", (req, res) => {
  res.render("success");
});

//FOR ADMIN PAGE DATA SHOWING
app.get("/admin", async (req, res) => {
  try {
    const formData = await monmodel.find();
    res.render("admin", { formData });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
// Delete a ADMIN DATA
app.post("/admin/delete/:id", async (req, res) => {
  const { id } = req.params;
  await monmodel.findByIdAndDelete(id);
  res.redirect("/admin");
});
//to convert date into string
hbs.registerHelper("date", function (value, format) {
  return moment(value).format(format);
});
//for serial number of data
hbs.registerHelper("addOne", function (value) {
  return value + 1;
});
//FOR SENDING THE MAIL TO THE USER
app.post("/admin/confirm/:id", async (req, res) => {
  const { id } = req.params;
  const form = await monmodel.findById(id);
  let userEmail = form.email;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Confirmation Email",
    text: `Welcome to EXPLORE !\n\nThank you for confirming your destination\nWe’re thrilled to have you on board. At Explore, we’re committed to helping you discover new experiences and adventures.
        
  Here are a few things you can do next:
  
  Check out our latest adventures and experiences on our website.
  Connect with us on social media for updates and special offers.
  If you have any questions or need assistance, don’t hesitate to reach out to our support team.
  Remember, the world is full of amazing things waiting to be explored. Let’s start this journey together!\n\n\n\nPlese pay your price using this link\n${process.env.PAY}\n\n\n\nBest reagrds,\nThe EXPLORE team.
  `,
  };
  transporter
    .sendMail(mailOptions)
    .then(async (info) => {
      console.log("mail sent successfully");
      // Update the status after sending the email
      await monmodel.findByIdAndUpdate(id, { status: "Done" });
      res.redirect("/admin");
    })
    .catch((error) => {
      console.log(error);
      res.json({ message: "Error updating status" });
    });
});

//FOR FORM SUBMISSION DATE
app.post("/submit-form", (req, res) => {
  let formData = req.body;
  // Add the current date as the submission date
  formData.submissionDate = new Date();
});
// ****************************BOOKING SECTION COMPLETE********************************

//ROUTING ALL PAGES
//THIS IS INDEX PAGE
app.get("/", (req, res) => {
  res.render("index", {
    statename: "Log in",
  });
});
//INDIAN DESTINATION ROUTING
app.get("/andaman", (req, res) => {
  res.render("andaman");
});
app.get("/gujrat", (req, res) => {
  res.render("gujrat");
});
app.get("/jammu", (req, res) => {
  res.render("jammu");
});
app.get("/kerala", (req, res) => {
  res.render("kerala");
});
app.get("/rajasthan", (req, res) => {
  res.render("rajasthan");
});
app.get("/kasmir", (req, res) => {
  res.render("jammu");
});
//INTERNATIONAL DESTINATION ROUTING
app.get("/america", (req, res) => {
  res.render("america");
});
app.get("/austrelia", (req, res) => {
  res.render("austrelia");
});
app.get("/canada", (req, res) => {
  res.render("canada");
});
app.get("/europe", (req, res) => {
  res.render("europe");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/africa", (req, res) => {
  res.render("africa");
});
//for login
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("login");
});
app.get("/chat", (req, res) => {
  res.render("chat");
});
// app.get("/nearbyPlaces", (req, res) => {
//   res.render("nearbyPlaces");
// });
//others page
app.get("/contact", (req, res) => {
  res.render("contact");
});

//CONTACT US PAGE
//CONNECTING TO THE DATABASE
const contactdataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contactdata = mongoose.model("Contactdata", contactdataSchema);
app.post("/submit", (req, res) => {
  const newContactdata = new Contactdata({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  newContactdata
    .save()
    .then(() => {
      res.render("contact");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/contactinfo", (req, res) => {
  Contactdata.find({})
    .then((user1) => {
      res.render("contactinfo", { user1: user1 });
    })
    .catch((err) => {
      console.log(err);
    });
});
//for delete
app.delete("/contactinfo/:id", (req, res) => {
  Contactdata.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/contactinfo");
    })
    .catch((err) => {
      console.log(err);
    });
});

//ROUTING PAGE
app.get("/blog", (req, res) => {
  res.render("blog");
});

const Subscriber = mongoose.model(
  "Subscriber",
  new mongoose.Schema({
    email: String,
    subscribed: Boolean,
  })
);
app.post("/subscribe", (req, res) => {
  const subscriber = new Subscriber({
    email: req.body.email,
    subscribed: true,
  });
  subscriber
    .save()
    .then(() => res.render("blog"))
    .catch((err) => console.log(err));
});
// to data in page
app.get("/subscribers", (req, res) => {
  Subscriber.find({})
    .then((subscribers) => {
      res.render("subscribers", { subscribers: subscribers });
    })
    .catch((err) => console.log(err));
});

//for delete
app.delete("/Subscribers/:id", (req, res) => {
  Subscriber.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/subscribers");
    })
    .catch((err) => {
      console.log(err);
    });
});

//before going to the booking page authentication check
app.get("/booking", auth, (req, res) => {
  res.render("booking");
});
// CONTACT DATA IN HOME PAGE
const contactSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  phone_number: Number,
  date: {
    type: String,
    default: () => {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      return `${date}-${month}-${year}`;
    },
  },
});
const Contact = mongoose.model("Contact", contactSchema);
app.post("/submit", (req, res) => {
  const newContact = new Contact({
    full_name: req.body.full_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
  });
  newContact
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
//FOR SHOWING THIS HOME PAGE CONTACT DATA TO THE CONTACTDATA PAGE
app.get("/contactdata", (req, res) => {
  Contact.find({})
    .then((users) => {
      res.render("contactdata", { users: users });
    })
    .catch((err) => {
      console.log(err);
    });
});
//for delete
app.delete("/contactdata/:id", (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/contactdata");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Create a mongoose schema
const reviewSchema = new mongoose.Schema({
  username: String,
  review: String,
});

const Review = mongoose.model("Review", reviewSchema);

app.get("/nearbyPlaces", (req, res) => {
  Review.find({})
    .then((reviews) => {
      res.render("nearbyPlaces", { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching reviews");
    });
});

app.post("/nearbyPlaces", (req, res) => {
  const { username, review } = req.body;

  // Create a new review and save it to the database
  const newReview = new Review({ username, review });
  newReview
    .save()
    .then(() => {
      res.redirect("/nearbyPlaces");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

//for error message
app.get("*", (req, res) => {
  res.render("error");
});
app.listen(port, () => {
  console.log(`The port is listennig at ${port}`);
});
