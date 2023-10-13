const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/LoginCredential")
.then(()=>{
    console.log("mongodb is connected");
})
.catch(()=>{
    console.log('Failed to connect');
})

const loginschema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

const collecttion=new mongoose.model("collection1",loginschema)

module.exports=collecttion