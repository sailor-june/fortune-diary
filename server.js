const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const app = express();
require("dotenv").config();
const diaryController = require('./controllers/diary')
const cardsController = require('./controllers/cards')



//////config////////
mongoose.set("strictQuery",false)
mongoose.connect(process.env.DATABASE_URI)
const PORT = process.env.PORT;
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
/////////////middleware
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))

/////controllers

app.use('/draw', cardsController)
app.use('/diary', diaryController)


/////listener
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})