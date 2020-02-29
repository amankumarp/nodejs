const express=require('express');
const app=express();
app.set('view engine','ejs');//set the ejs engine 
app.use(express.static('public'));//for using static file  
require('./routes')(app);
app.listen(3000,(data)=>{
    console.log("server is running localhost:3000");
})