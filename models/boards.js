const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  ut: { type: Date, default: Date.now }, // updated time : timestamp
  ip: { type: Date, default: '' }, // ip address
  id: { type: String, default: '' }, // Writer
  title: { type: String, default: '제목 없음', index: true }, // title
  content: { type: String, default: '' }, // content
  cntView: { type: Number, default: 0 }, // view cnt
  cntLike: { type: Number, default: 0 }, // like cnt
  cmt_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // comment
});

module.exports = mongoose.model('Board', boardSchema);

