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

const port = process.env.PORT || 3000;

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

// MONGODB CONNECT
mongoose
  .connect("mongodb://127.0.0.1:27017/UserData", {
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
  } catch (error) {
    // console.log(error);
  }
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

//HANDLING THE LOGIN PORTION HERE
// app.use(function(req, res, next) {
//   res.locals.loggedIn = false; // Set the default value to false
//   next();
// });

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
//      //token genaration during login
//       const token = await user.generateAuthToken();
//       res.cookie("jwtCookies", token, {
//         httpOnly: true,
//         maxAge: 1800000, // 30 minutes in milliseconds
//       });
//       if (isMatch) {
//         res.locals.loggedIn = true; 
//         res.render("index");

      
//       } else {
//         res.send("Invalid credentials");
//       }
//     } else {
//       res.send("This is wrong number");
//     }
//   }
// });

//HANDLING THE LOGIN PORTION
app.use(function(req, res, next) {
  res.locals.loggedIn = false; // Set the default value to false
  const token = req.cookies.jwtCookies; // Extract the JWT token from the cookies
  if (token) {
    try {
      // const verifyUser = jwt.verify(token, 'mynameissukalyanadhikaryiamasoftwareenginner'); // Verify the token
      res.locals.loggedIn = true; // Set loggedIn to true if the token is valid
    } catch (error) {
      // console.error(error.message);
    }
  }
  next();
});



app.post("/login", async (req, res) => {
  const { loginname, loginpassword } = req.body;
  if (loginname === "admin") {
    const adminPassword = "A@1234"; // replace with your actual admin password
    if (loginpassword === adminPassword) {
      res.redirect("admin");
    } else {
      res.send("Invalid admin credentials");
    }
  } else {
    const user = await User.findOne({ username: loginname });
    if (user) {
      const isMatch = await bcryptjs.compare(loginpassword, user.password);
     //token genaration during login
     
   
      // res.cookie("jwtCookies", token, {
      //   httpOnly: true,
      //   maxAge: 1800000, // 30 minutes in milliseconds
      
      // })
      if (isMatch) {
        const token = await user.generateAuthToken();
        res.cookie("jwtCookies", token, {
          httpOnly: true,
          maxAge: 1800000, // 30 minutes in milliseconds
        });
        res.locals.loggedIn = true; // Update the loggedIn status
        res.render("index"); // Render the index template
       
      } else {
        res.send("Invalid credentials");
      }
    }
  };
});



// app.get('/logout',auth,async (req, res) => {
// try{
//   console.log(req.user1);
//   res.user1.tokens=res.user1.tokens.filter((currElement) => {
//         return currElement.token != req.token;
//   })
//   res.clearCookie('jwtCookies');
//   console.log('logout successfully');
//   await res.User.save();
//   res.render('index');
// }catch(error){
//   console.log(error);
// }
// });



app.get('/logout', (req, res) => {
  const currentPage = req.headers.referer || '/'; // Get the current page URL or set the default to '/'
  res.clearCookie('jwtCookies'); // Clear the jwtCookies cookie
  res.locals.loggedIn = false; // Update the loggedIn status
  res.redirect(currentPage); // Redirect to the current page
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
  res.render('login')
});


// **************************************for booking ***************************************



app.post("/post", async (req, res) => {
  console.log("inside the post function");
  const data = new monmodel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    destination: req.body.destination,
    // phoneNumber:req.body.phoneNumber,
    email: req.body.email,
    numberOfGuests: req.body.numberOfGuests,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    specialRequest: req.body.specialRequest,
  });
  const val = await data.save();
  res.redirect('booking')
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
    from: "sukalyanadhikary2021@gmail.com",
    to: userEmail,
    subject: "Confirmation Email",
    // text: 'Thank You for confirming us and you have successfully booked your destination. Please Pay '
    html: `<h1>Welcome to Explore</h1><pre>Thank you for confirming your destination and welcome to Explore!

        We’re thrilled to have you on board. At Explore, we’re committed to helping you discover new experiences and adventures.
        
        Here are a few things you can do next:
        
        Check out our latest adventures and experiences on our website.
        Connect with us on social media for updates and special offers.
        If you have any questions or need assistance, don’t hesitate to reach out to our support team.
        Remember, the world is full of amazing things waiting to be explored. Let’s start this journey together!
        
        <u><b><l>Pay on this upi sukalyan8317@axl</l></b></u>

        Best regards, 
        The Explore Team</pre>
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
app.get("/login", auth, (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("login");
});

app.get("/chat", (req, res) => {
  res.render("chat");
});
app.get("/nearbyPlaces", (req, res) => {
  res.render("nearbyPlaces");
});

//others page
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/blog", (req, res) => {
  res.render("blog");
});

//before going to the booking page authentication check
app.get("/booking", auth, (req, res) => {
  res.render("booking");
});

app.get("/payment", (req, res) => {
  res.render("payment");
});





//for error message
app.get("*", (req, res) => {
  res.render("error");
});
app.listen(port, () => {
  console.log(`The port is listennig at ${port}`);
});
