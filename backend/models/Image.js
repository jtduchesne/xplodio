const mongoose = require('mongoose');
const fs = require('fs');

const imageSchema = new mongoose.Schema(
  {
    externalUrl: {
      type: String,
      required: false,
    },
    upload: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      required: false,
    },
  },
  { timestamps: true }
);
imageSchema.virtual('url').get(function() {
  return this.upload ? this.upload.url : this.externalUrl;
});

imageSchema.pre('find', function() {
  this.populate('upload', 'url -_id');
});
imageSchema.pre('findOne', function() {
  this.populate('upload', 'url -_id');
});
imageSchema.post('save', function(image, next) {
  image.populate('upload', 'url -_id').execPopulate().then(() => next());
});

module.exports = mongoose.model('Image', imageSchema);
