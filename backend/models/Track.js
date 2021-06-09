const mongoose = require('mongoose');
const fs = require('fs');

const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

function hideFilePath(doc, ret, options) {
  delete ret.filePath;
  return ret;
}
trackSchema.set('toJSON', {transform: hideFilePath});
trackSchema.set('toObject', {transform: hideFilePath});

trackSchema.pre('remove', function(next) {
  fs.unlink(this.filePath, next);
});

module.exports = mongoose.model('Track', trackSchema);
