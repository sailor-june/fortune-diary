const express = require("express");
const mongoose = require("mongoose");
const diaryRouter = express.Router();
const Diary = require("../models/diary");
const Cards = require("../public/tarot-images.json");

/////
diaryRouter.use(express.static("public"));

/////Index
diaryRouter.get("/", (req, res) => {
  Diary.find({}, (error, allEntries) => {
    res.render("gallery.ejs", {
      entries: allEntries,
      Deck: Cards,
    });
  });
});

////new

diaryRouter.get("/new", (req, res) => {
  res.render("new.ejs", {
    Deck: Cards,
  });
});
////delete
diaryRouter.delete("/:id", (req,res)=>{
    Diary.findByIdAndDelete(req.params.id,(err,data)=>{
        res.redirect("/diary")
    })
})

/////update
diaryRouter.put("/:id",(req,res)=>{
Diary.findById(req.params.id, (err,data)=>{
let newReading = {cards:data.cards}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
req.body.suit = capitalizeFirstLetter(req.body.suit)

newReading.cards[req.body.index].suit =req.body.suit
newReading.cards[req.body.index].number = req.body.number
Diary.findByIdAndUpdate(req.params.id, newReading, {new:true},(error,upDatedEntry)=>{res.redirect(`/diary/${req.params.id}`)})})})
 

////create
diaryRouter.post("/", (req, res) => {
  Diary.create(req.body, (error, createdEntry) => {
    if (error) {
      console.log(error);
    }
    res.redirect("/diary");
  });
});
///edit
diaryRouter.get("/edit/:id", (req,res)=>{
    Diary.findById(req.params.id, (err,foundEntry)=>{
        res.render("edit.ejs",{
            entry: foundEntry,
            Deck: Cards
        })
    })
})
////show
diaryRouter.get("/:id", (req, res) => {
  Diary.findById(req.params.id, (err, foundEntry) => {
    res.render("show.ejs", {
      entry: foundEntry,
      Deck: Cards
    });
  });
});
module.exports = diaryRouter;
