const express=require('express');
const router=express.Router();
const path=require('path');
const userModel=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { generatetoken } = require("../utilis/generatetoken");
const {registeredUser, loginUser}=require("../controllers/authController");

router.get("/",function(req,res){
    res.render('home');
});

router.get("/login",function(req,res){
    res.render('login');
});

router.post("/login",loginUser);

router.get("/create",function(req,res){
    res.render('create');
});

router.post("/create",registeredUser);


router.get("/launch",function(req,res){
    res.render('launch');
});

module.exports=router;