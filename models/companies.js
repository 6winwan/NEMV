const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
	name: { type: String, index: true}, // name
 	ut: { type: Date, default: Date.now}, // timestamp
	pos: { // lat and lag are useful for google
		lat: {type:Number, default:37.1},
		lng: {type:Number, default:127.1},
	},
	type: {type: Number, default: 0}, // extra space
	rmk: {type: String, default: 'NEW'}, // remark : explanation
	gr_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group'}], // Group
});

module.exports = mongoose.model('Company', companySchema);



