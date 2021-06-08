const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      match: /^[a-z][a-z-]{2,}$/,
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Artist', artistSchema);
