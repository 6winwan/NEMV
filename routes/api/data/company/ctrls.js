const Company = require('../../../../models/companies');

exports.list = (req, res) => {
  //res.send({ success: false, msg: 'list preparing' });
  Company.find()
  	.then(rs => res.send({ success: true, ds: rs}))
  	.catch(err => res.send({ success: false, msg: err.message }));
};

exports.add = (req, res) => {
  //res.send({ success: false, msg: 'add preparing' });
  const { name, rmk } = req.body;

  if(!name) return res.send({ success: false, msg: 'No name'});
  if(!rmk) return res.send({ success: false, msg: 'No. name'});
  const cp = new Company({ name: name, rmk: rmk});
  cp.save()
  	.then(r => res.send({ success: true, d: r}))
  	.catch(err => res.send({ success: false, msg: err.message}));
 };

exports.mod = (req, res) => {
  res.send({ success: false, msg: 'mod preparing' });
};

exports.del = (req, res) => {
  res.send({ success: false, msg: 'del preparing' });
};