const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  cards: [
    {suit: {type: String, required: true},
     number: {type:String, required: true}},
  ],
  notes: { type: String, required: false },
},{timestamps: {createdAt: 'created_at'}})

module.exports = mongoose.model("Entry", entrySchema)