const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
  }
);
trackSchema.virtual('url').get(function() {
  return this.file.url;
});

trackSchema.pre('find', function() {
  this.populate('file', 'url contentType -_id');
});
trackSchema.pre('findOne', function() {
  this.populate('file', 'url contentType -_id');
});
trackSchema.post('save', function(track, next) {
  track.populate('file', 'url contentType -_id').execPopulate().then(() => next());
});

module.exports = mongoose.model('Track', trackSchema);
