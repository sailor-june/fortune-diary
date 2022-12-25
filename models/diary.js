const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  cards: { type: Array , required: true },
  notes: { type: String, required: false },
})

module.exports = mongoose.model("Entry", entrySchema)