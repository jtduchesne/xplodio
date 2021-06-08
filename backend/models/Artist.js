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

artistSchema.pre('remove', async function(next) {
  try {
    for await (let song of this.model('Song').find({ artist: this._id }))
      song.remove();
    next();
  } catch(err) {
    next(err);
  }
});

module.exports = mongoose.model('Artist', artistSchema);
