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
      match: /^[A-Za-z0-9][A-Za-z0-9-]{2,}$/,
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

songSchema.pre('find', function() {
  this
    .populate('artwork', 'url -_id')
    .populate('artist', 'name slug -_id')
    .populate('tracks', 'name file -_id');
});
songSchema.pre('findOne', function() {
  this
    .populate('artwork', 'url -_id')
    .populate('artist', 'name slug -_id')
    .populate('tracks', 'name file -_id');
});
songSchema.post('save', function(song, next) {
  song
    .populate('artwork', 'url -_id')
    .populate('artist', 'name slug -_id')
    .populate('tracks', 'name file -_id')
    .execPopulate().then(() => next());
});

module.exports = mongoose.model('Song', songSchema);
