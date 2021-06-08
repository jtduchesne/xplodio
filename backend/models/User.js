const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

function hideProvider(doc, ret, options) {
  delete ret.provider;
  delete ret.uid;
  return ret;
}
userSchema.set('toJSON', {transform: hideProvider});
userSchema.set('toObject', {transform: hideProvider});

module.exports = mongoose.model('User', userSchema);
