const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Home Page")
})
const port=3000;
app.listen(port,()=>{
    console.log(`server started ${port}`);
});