const Company = require('./models/companies');
const Group = require('./models/groups');

exports.test = {
  model: () => {
    console.log('model test');
    
    Company.findOne({ name: 'test' })
      .then((cp) => {
        if (!cp) throw new Error('company does not exist!');
        const gr = new Group({
          name: 'group2',
          cp_id: cp._id,
        });
        return gr.save();
      })
      .then((gr) => {
        return Company.findOneAndUpdate(
          { _id: gr.cp_id }, 
          { $addToSet: { gr_ids : gr._id }}, 
          { new: true })
          .populate('gr_ids');
      })
      .then((r) => {
        console.log(r);
      })
      .catch(err => console.error(err));
  },
};

/* read test result
model test
{ pos: { lat: 37.1, lng: 127.1 },
  type: 0,
  rmk: 'NEW',
  gr_ids: [],
  _id: 5b8aea4963d2ab3ab44d2db8,
  name: 'test',
  ut: 2018-09-01T19:36:41.817Z,
  __v: 0 }

*/


/*
exports.test = {
	model: () =>{
		console.log('model test');
	
   const cp = new Company({
      name: 'test',
    });
    cp.save()
      .then((r) => {
        console.log(r);
      })
      .catch(err => console.error(err));
  },
};

*/


/* write test result 
model test
{ pos: { lat: 37.1, lng: 127.1 },
  type: 0,
  rmk: 'NEW'
  gr_ids: [],
  _id: 5b8aed5c1fb98c376c1e7774,
  name: 'test',
  ut: 2018-09-01T19:49:48.843Z,
  __v: 0 }
 */


