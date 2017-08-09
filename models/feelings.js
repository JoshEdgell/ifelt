const mongoose = require('mongoose');

const feelingSchema = new mongoose.Schema({
  feeling: String
});

module.exports = mongoose.model('Feeling', feelingSchema);
