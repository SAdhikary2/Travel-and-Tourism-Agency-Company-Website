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

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/andaman',(req,res)=>{
    res.render('andaman')
})

app.get('/rajasthan',(req,res)=>{
    res.render('rajasthan')
})

app.get('/jammu',(req,res)=>{
    res.render('jammu')
})

app.get('/gujrat',(req,res)=>{
    res.render('gujrat')
})

app.get('/kerala',(req,res)=>{
    res.render('kerala')
})

app.get('/andaman',(req,res)=>{
    res.render('andaman')
})

app.get('/andaman',(req,res)=>{
    res.render('andaman')
})

app.get('/andaman',(req,res)=>{
    res.render('andaman')
})

app.get('/andaman',(req,res)=>{
    res.render('andaman')
})

app.get('/andaman',(req,res)=>{
    res.render('andaman')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})





app.get('*',(req,res)=>{
    res.send(`<h1>Page not found so what can i do</h1>`)
})



app.listen(port,()=>{
    console.log(`The port is listennig at ${port}`);
})
