const Freelancer = require("../models/freelancer");
const bcrypt = require("bcryptjs")

exports.saveFreelancer = async (req, res, next) => {

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const freelancer = new Freelancer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cin: req.body.cin,
    tel: req.body.tel,
    email: req.body.email,
    password: hashedPassword


  });
  freelancer
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        status: true,
        data: freelancer,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get = (req, res) => {
  Freelancer.find({}).exec(function (err, freelancers) {
    if (err) {
      console.error("erreur");
    } else {

      res.json(freelancers);
    }
  });
}
exports.putById = (req, res) => {
  Freelancer.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((freelancer) => {
      res.status(200).send(freelancer)
    })
    .catch((error) => { console.log(error) });
}

exports.deleteById = (req, res) => {
  Freelancer.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      res.status(200).json("Deleted...")
    })
    .catch((error) => { console.log(error) });
}
exports.getById = (req, res) => {
  //let productId = req.params.productId;
  Freelancer.findById({ _id: req.params.id })
    .then((freelancer) => {
      res.status(200).send(freelancer)
    })
    .catch((error) => { console.log(error) });
}