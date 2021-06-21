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
      match: /^[A-Za-z0-9][A-Za-z0-9-]{2,}$/,
      index: true,
      unique: true,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  },
  { timestamps: true }
);

artistSchema.pre('find', function() {
  this.populate('avatar', 'url -_id');
});
artistSchema.pre('findOne', function() {
  this.populate('avatar', 'url -_id');
});
artistSchema.post('save', function(artist, next) {
  artist.populate('avatar', 'url -_id').execPopulate().then(() => next());
});

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
