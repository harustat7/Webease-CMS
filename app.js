const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const path=require("path");
const usersRoutes=require("./routes/userRouter");
// const indexRoutes=require("./routes/index");
const router=express.Router();
const expressSession=require("express-session");
const flash=require("connect-flash");


require("dotenv").config();

const db=require("./config/mongoose-connection");
const { loginUser , registeredUser } = require("./controllers/authController");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

// app.use("/",indexRoutes); 
app.use("/users",usersRoutes);

app.get("/",function(req,res){
    res.render('home'); 
})

app.get("/login",function(req,res){
    res.render('login'); 
})

app.post("/login",loginUser);

app.get("/create",function(req,res){
    res.render('create');
})

router.post("/create",registeredUser);

app.get("/launch",function(req,res){
    res.render('launch'); 
})

app.listen(3000);
