const express=require("express");
const mongoose = require('mongoose')
const diaryRouter = express.Router();
const Diary=require("../models/diary")
const Cards = require ('../models/tarot-images')



/////
diaryRouter.use(express.static("public"))
//seed route
diaryRouter.get("/seed", (req, res) => {
    Diary.deleteMany({}, (error, allEntries) => {});
  
    Diary.create(diarySeed, (error, data) => {
      res.redirect("/diary");
    });
  });
  
/////Index
diaryRouter.get("/", (req,res)=>{
    Diary.find({},(error,allEntries)=>{
        res.render("gallery.ejs",{
            entries: allEntries
        })
    })
})

////new

diaryRouter.get("/new",(req,res)=>{
    res.render("new.ejs",{
        deck:Cards
    })
})
////create
diaryRouter.post("/", (req,res)=>{
    Diary.create(req.body,(error,createdEntry)=>{
        if (error){
            console.log(error)
        }
        res.send("success")
    })
})

module.exports=diaryRouter
