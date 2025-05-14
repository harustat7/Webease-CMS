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
app.use('/api/deploy', require('./routes/deployRoutes'));
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

app.get("/selecttemplate",function(req,res){
    const domain=req.query.domain;
    res.render('selecttemplate', {domain});
});

app.post('/api/select-template', (req, res) => {
    const { userEmail, category, templateName } = req.body;

    console.log('User Email:', userEmail);
    console.log('Category:', category);
    console.log('Template Name:', templateName);

    // Here you can save this info to DB if you want.
    res.json({ message: 'Template selection successful!' });
});

app.get("/businesstemplates",function(req,res){
    res.render('businesstemplates');
});

app.get("/ecommercetemplates",function(req,res){
    res.render('ecommercetemplates');
});

app.get("/educationaltemplates",function(req,res){
    res.render('educationaltemplates');
});

app.get("/traveltemplates",function(req,res){
    res.render('traveltemplates');
});

app.get("/blogtemplates",function(req,res){
    res.render('blogtemplates');
});

app.get('/editor', (req, res) => {
    const { email, template } = req.query;
    res.render('editor', { email, template }); 
});

app.post('/api/save-template', async (req, res) => {
    const { email, updatedHtml, templateName } = req.body;
  
    try {
      // 1. Save to database
      // OR
      // 2. Save to file system (example below)
  const fs = require('fs');
    const path = require('path');

    const folderPath = path.join(__dirname, 'savedTemplates');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const savePath = path.join(folderPath, `${email}_${templateName}.html`);
    fs.writeFileSync(savePath, updatedHtml, 'utf-8');

    res.json({ message: 'Template saved successfully!' });
  } catch (err) {
    console.error('Error saving template:', err);
    res.status(500).json({ message: 'Failed to save template', error: err.message });
  }
});
  


app.listen(3000);
