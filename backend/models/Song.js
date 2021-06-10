const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
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
    length: {
      type: Number,
      required: true,
    },
    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
      index: true,
    },
    tracks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Track',
    }],
  },
  { timestamps: true }
);

songSchema.pre('remove', function(next) {
  try {
    if (this.artwork)
      this.artwork.remove();
    this.tracks.forEach((track) => track.remove());
    next();
  } catch(err) {
    next(err);
  }
});

module.exports = mongoose.model('Song', songSchema);
