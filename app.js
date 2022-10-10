const express=require("express");
const mongoose=require("mongoose");
const ejs=require("ejs");
const MongoStore=require("connect-mongo");
const flash = require('connect-flash');
const methodOverride=require("method-override")
const pageRouters=require("./routers/pageRouters");
const courseRouters=require("./routers/courseRouters");
const categoryRouters=require("./routers/categoryRouters");
const userRouters=require("./routers/userRouters");
const session=require("express-session");
const app=express();
global.userIn=null;
app.set("view engine","ejs");
app.use(session({
  secret: 'knights who say ni',
  resave: false,
  saveUninitialized: true,
  store:MongoStore.create({mongoUrl:"mongodb://localhost/smartedu-db"})
}))
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use('*', (req, res, next) => {
  userIn = req.session.userID;
  next();
})
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("connect db");})
.catch(()=>{console.log("error db");});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
app.use("/",pageRouters);
app.use("/courses",courseRouters);
app.use("/categories",categoryRouters)
app.use("/users",userRouters)
const port=3000;
app.listen(port,()=>{
    console.log(`server started ${port}`);
});