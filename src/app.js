require("dotenv").config();
const express=require('express');
const app=express();
const path=require('path')
const hbs=require('hbs')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const session =require('express-session')
const monmodel=require('./mongodb') 
const moment = require('moment'); //to convert date in to string
const nodemailer = require('nodemailer');

const port=process.env.PORT || 3000;

// PATH 
staticPath=path.join(__dirname,'../public');
viewPath=path.join(__dirname,'../templates/views');
partialPath=path.join(__dirname,'../templates/partials');

//VIEW ENGINE
app.set('view engine','hbs')
app.set('views',viewPath);
hbs.registerPartials(partialPath)

//ROUTING`
app.use(express.static(staticPath))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// MONGODB CONNECT 
mongoose.connect('mongodb://127.0.0.1:27017/UserData', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected successfully'))
.catch((err)=> console.error(err))

// ******************************** For Login and Registration****************************
//DEFINE USER SCHEMA AND MODEL
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  const User = mongoose.model('User', userSchema);

 app.post('/login', async (req, res) => {
    const { loginname, loginpassword } = req.body;
    const user = await User.findOne({ username: loginname, password: loginpassword });
    if (user) {
        res.render('index');
    } else if (loginname === 'admin') {
        const adminPassword = 'A@1234'; // replace with your actual admin password
        if (loginpassword === adminPassword) {
            res.redirect('admin')
        } else {
            res.send('Invalid admin credentials');
        }
    } else {
       res.send('This is wrong number')
    }
});
  
  // Handle registration form submissions
    app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.send(`<h1>You Have Register Successfully !!</h1>`)
  });
  
// **************************************for booking ***************************************
app.post('/post', async (req, res) => {
    console.log('inside the post function');
    const data=new monmodel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        destination:req.body.destination,
        // phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        numberOfGuests:req.body.numberOfGuests,
        checkInDate:req.body.checkInDate,
        checkOutDate:req.body.checkOutDate,
        specialRequest: req.body.specialRequest,
        
    })
    const val=await data.save()
    // res.json(val)
    res.send('booking successfull')
  });

//FOR ADMIN PAGE DATA SHOWING
app.get('/admin',async(req,res)=>{
    try {
        const formData = await monmodel.find();
        res.render('admin', { formData });
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
})

  // Delete a form
app.post('/admin/delete/:id', async (req, res) => {
    const { id } = req.params;
    await monmodel.findByIdAndDelete(id);
    res.redirect('/admin');
});

//to convert date into string
hbs.registerHelper('date', function(value, format) {
    return moment(value).format(format);
});

//for serial number of data
hbs.registerHelper('addOne', function(value) {
    return value + 1;
});


app.post('/admin/confirm/:id', async (req, res) => {
    const { id } = req.params;
    const form = await monmodel.findById(id);
    let userEmail = form.email;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: 'sukalyanadhikary2021@gmail.com',
            pass: 'xags uttu ezyk xchd'
        }
    });

    let mailOptions = {
        from: 'sukalyanadhikary2021@gmail.com',
        to: userEmail,
        subject: 'Confirmation Email',
        // text: 'Thank You for confirming us and you have successfully booked your destination. Please Pay '
        html:`<h1>Welcome to Explore</h1><pre>Thank you for confirming your destination and welcome to Explore!

        We’re thrilled to have you on board. At Explore, we’re committed to helping you discover new experiences and adventures.
        
        Here are a few things you can do next:
        
        Check out our latest adventures and experiences on our website.
        Connect with us on social media for updates and special offers.
        If you have any questions or need assistance, don’t hesitate to reach out to our support team.
        Remember, the world is full of amazing things waiting to be explored. Let’s start this journey together!
        
        <u><b><l>Pay on this upi sukalyan8317@axl</l></b></u>

        Best regards, 
        The Explore Team</pre>
        `
    };

    transporter.sendMail(mailOptions)
        .then(async info => {
            console.log('mail sent successfully');
            // Update the status after sending the email
            await monmodel.findByIdAndUpdate(id, { status: 'Done' });
            res.redirect('/admin');
        })
        .catch(error => {
            console.log(error);
            res.json({message: "Error updating status"});
        });
});





// app.post('/admin/confirm/:id', async (req, res) => {
//     const { id } = req.params;
//     const form = await monmodel.findById(id);
//     let userEmail = form.email;

//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         secure: true,
//         logger: true,
//         debug: true,
//         secureConnection: false,
//         auth: {
//             user: 'sukalyanadhikary2021@gmail.com',
//             pass: 'xags uttu ezyk xchd'
//         }
//     });

//     let mailOptions = {
//         from: 'sukalyanadhikary2021@gmail.com',
//         to: userEmail,
//         subject: 'Confirmation Email',
//         text: 'Your booking has been confirmed.'
//     };

//     transporter.sendMail(mailOptions)
//         .then(async info => {
//             console.log('mail sent successfully');
//             // Update the status after sending the email
//             await monmodel.findByIdAndUpdate(id, { status: 'Done' });
//             res.redirect('/admin');
//         })
//         .catch(error => {
//             console.log(error);
//             res.send('Error updating status');
//         });
// });




// app.post('/admin/confirm/:id',async (req, res) => {
//     // Retrieve the user's email from the database using the ID from the URL
//     // This is just a placeholder and should be replaced with your actual code
    
//     const { id } = req.params;
//     const form = await monmodel.findById(id);
//     let userEmail =form.email;

//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         // port:465,
//         secure:true,
//         logger:true,
//         debug:true,
//         secureConnection:false,
//         auth: {
//             user: 'sukalyanadhikary2021@gmail.com',
//             pass: 'xags uttu ezyk xchd'
//         }


//     });

  

//     let mailOptions = {
//         from: 'sukalyanadhikary2021@gmail.com',
//         to: userEmail,
//         subject: 'Confirmation Email',
//         text: 'Your booking has been confirmed.'
//     };

//     transporter.sendMail(mailOptions)
//         .then(info => {
//             console.log('mail sent successfully');
//             // Your existing code to confirm the booking...
//             res.send('mail sent successfully')
//         })
//         .catch(error => {
//             console.log(error);
//         });
// });




//FOR FORM SUBMISSION DATE
app.post('/submit-form', (req, res) => {
    let formData = req.body;
    
    // Add the current date as the submission date
    formData.submissionDate = new Date();
    
    // Save formData to database...
});


//FOR SETTING STATUS DONE
// app.post('/admin/confirm/:id', (req, res) => {
//     monmodel.findByIdAndUpdate(req.params.id, { status: 'Done' })
//       .then(() => {
//         res.redirect('/admin');

//       })
//       .catch((err) => {
//         console.log(err);
//         res.send('Error updating status');
//       });
//   });
  


//THIS IS INDEX PAGE 
app.get('/',(req,res)=>{
    res.render('index',{
        statename:'Log in'
     })
})

//INDIAN DESTINATION ROUTING
app.get('/andaman',(req,res)=>{
    res.render('andaman')
})
app.get('/gujrat',(req,res)=>{
    res.render('gujrat')
})
app.get('/jammu',(req,res)=>{
    res.render('jammu')
})
app.get('/kerala',(req,res)=>{
    res.render('kerala')
})
app.get('/rajasthan',(req,res)=>{
    res.render('rajasthan')
})
app.get('/kasmir',(req,res)=>{
    res.render('jammu')
})


//INTERNATIONAL DESTINATION ROUTING
app.get('/america',(req,res)=>{
    res.render('america')
})
app.get('/austrelia',(req,res)=>{
    res.render('austrelia')
})
app.get('/canada',(req,res)=>{
    res.render('canada')
})
app.get('/europe',(req,res)=>{
    res.render('europe')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/africa',(req,res)=>{
    res.render('africa')
})



//for login 
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/signup',(req,res)=>{
    res.render('login')
})




//others page
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/blog',(req,res)=>{
    res.render('blog')
})
app.get('/booking',(req,res)=>{
    res.render('booking')
})
app.get('/payment',(req,res)=>{
    res.render('payment')
})


//for error message
app.get('*',(req,res)=>{
    res.render('error')
})
app.listen(port,()=>{
    console.log(`The port is listennig at ${port}`);
})
