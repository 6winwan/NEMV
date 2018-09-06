const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, index: true }, // name
  ut: { type: Date, default: Date.now }, // update date : timestamp
  pos: { // easy to use on Google
    lat: { type: Number, default: 37.1 },
    lng: { type: Number, default: 127.1 },
  },
  type: { type: Number, default: 0 }, // extra
  rmk: { type: String, default: '신규' }, // remark : explanation
  gr_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], // including groups
});

module.exports = mongoose.model('Company', companySchema);