require("dotenv").config();
const express=require('express');
const app=express();
const path=require('path')
const hbs=require('hbs')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const port=process.env.PORT || 3000;




// MONGODB CONNECT 
mongoose.connect('mongodb://127.0.0.1:27017/UserData', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected successfully'))
.catch((err)=> console.error(err))
//DEFINE USER SCHEMA AND MODEL
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  const User = mongoose.model('User', userSchema);

  // Use body-parser to parse request bodies
app.use(bodyparser.urlencoded({ extended: true }));

// Handle POST request for /login
app.post('/login', async (req, res) => {
    const { loginname, loginpassword } = req.body;
    const user = await User.findOne({ username: loginname, password: loginpassword });
    if (user) {
      res.render('index');
    } else {
      res.send('Invalid credentials');
    }
  });
  
  
  // Handle registration form submissions
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.render('booking')
   
  });


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

//THIS IS INDEX PAGE 
app.get('/',(req,res)=>{
    res.render('index')
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



// document.getElementById('bookingButton').addEventListener('click', function() {
//     fetch('/checkLoginStatus')
//     .then(response => response.json())
//     .then(data => {
//         if (data.loggedIn) {
//             window.location.href = '/booking';
//         } else {
//             window.location.href = '/login';
//         }
//     });
// });

// app.get('/checkLoginStatus', (req, res) => {
//     if (req.session && req.session.loggedIn) {
//         res.json({ loggedIn: true });
//     } else {
//         res.json({ loggedIn: false });
//     }
// });



function checkUserLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/booking', checkUserLoggedIn, (req, res) => {
    // If the user is logged in, this code will be executed
    res.redirect('/bookingPage');
});









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
