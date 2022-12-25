const express = require("express");
const mongoose = require("mongoose");
const cardRouter = express.Router();
const Diary = require("../models/diary.js");
const allCards = require("../models/tarot-images.js");

cardRouter.use(express.static("public"));
cardRouter.use(express.static("cards"));
//
/////Index
cardRouter.get("/", (req, res) => {
  res.render("draw.ejs", {
    Deck: allCards
  });
 
});
///new?
///delete
////update
////create
cardRouter.post("/"),
  (req, res) => {
    Diary.create(req.body, (error, createdEntry) => {
      res.redirect("/diary");
    });
  };

module.exports = cardRouter;
