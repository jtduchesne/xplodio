const mongoose = require('mongoose');
const fs = require('fs');

const uploadSchema = new mongoose.Schema(
  {
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
uploadSchema.set('toJSON', {transform: hideFilePath});
uploadSchema.set('toObject', {transform: hideFilePath});

uploadSchema.pre('remove', function(next) {
  fs.unlink(this.filePath, next);
});

module.exports = mongoose.model('Upload', uploadSchema);
