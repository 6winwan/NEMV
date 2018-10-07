const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  bd_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', index: true },
  ut: { type: Date, default: Date.now }, // updated : timestamp
  ip: { type: Date, default: '' }, // ip address
  id: { type: String, default: '' }, // writer
  content: { type: String, default: '' }, // content
  cntLike: { type: Number, default: 0 }, // like cnt
});

module.exports = mongoose.model('Comment', commentSchema);