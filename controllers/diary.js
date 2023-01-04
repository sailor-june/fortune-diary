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
/////update
////create
diaryRouter.post("/", (req, res) => {
  console.log(req.body);
  Diary.create(req.body, (error, createdEntry) => {
    if (error) {
      console.log(error);
    }
    res.send("success");
  });
});
///edit
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
