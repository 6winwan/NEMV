const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, index: true }, // name
  ut: { type: Date, default: Date.now }, // update date : timestamp
  pos: { // easy to use on Google
    lat: { type: Number, default: 51.048 },
    lng: { type: Number, default: -114.07 },
  },
  type: { type: Number, default: 0 }, // extra
  rmk: { type: String, default: 'New' }, // remark : explanation
  gr_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], // including groups
});

module.exports = mongoose.model('Company', companySchema);