const mongoose = require('mongoose');
const fs = require('fs');

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
  },
  { timestamps: true }
);

function hideFilePath(doc, ret, options) {
  delete ret.filePath;
  return ret;
}
imageSchema.set('toJSON', {transform: hideFilePath});
imageSchema.set('toObject', {transform: hideFilePath});

imageSchema.pre('remove', function(next) {
  if (this.filePath) fs.unlink(this.filePath);
  next();
});

module.exports = mongoose.model('Image', imageSchema);
