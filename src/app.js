const express=require('express');
const app=express();
const path=require('path')
const hbs=require('hbs')
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

//others page
app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.get('/blog',(req,res)=>{
    res.render('blog')
})






//for error message
app.get('*',(req,res)=>{
    res.render('error')
})


app.listen(port,()=>{
    console.log(`The port is listennig at ${port}`);
})
