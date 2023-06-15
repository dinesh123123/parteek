// import dependancies in index.js fiel
const express=require("express");
const index=express();
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
// import routes
//const routeUser=require("./routes/userRoutes");
//const userProfiles=require("./routes/userProfile_Routes");
const adminFile=require("./routes/adminRoutes");
const android=require("./routes/androidRoutes");
// middlewere setup
index.set("view engine","ejs");
index.set("views", path.join(__dirname, "views"));
index.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
index.set(path.join(__dirname, '/uploads'));
index.engine('html', require('ejs').renderFile);
index.use(express.static(path.join(__dirname, 'public')));



//create middlewere
index.use(express.json());
index.use(cookieParser());
index.use(session({secret:'my fdgfghbshanky',saveUninitialized: true,resave: true}));
//body parser using
index.use(bodyParser.urlencoded({ extended:false }));
index.use(bodyParser.json());



// routes setup
//index.use("/api",routeUser);
//index.use("/api",userProfiles);
index.use("/public",adminFile);
index.use("/public/api",android);



index.get("/public/api/pinioo",(req,res)=>{
        res.send('index')
})

index.get("/",(req,res)=>{
        res.send('hello everyone')
})


// Handling Errors
index.use((err, req, res, next) => {
    // console.log(err);
    //res.send(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});



// connect to browser
const port = 3055;
index.listen( function(error){
        if(error){
                console.log(error)
        }else{
                console.log("The server is running at port 3055");
        }
});


module.exports =index;
