exports.plz = (req, res) => {
	throw new Error('Server is not working');
 	res.send({ success: true, msg: 'hard to get here' });
};