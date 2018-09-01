const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
	name: { type:String, index: true }, 	//name
	ut: {type: Date, default: Date.now},	//timestamp 
	cp_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // need company
	rmk: {type: String, default: ''}, // remark : explanation
});

module.exports = mongoose.model('Group', groupSchema);




