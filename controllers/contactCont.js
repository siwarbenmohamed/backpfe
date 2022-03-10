const Contact = require("../models/contact");


exports.saveContact = (req, res, next) => {
  

    const contact = new Travaux({
       name: req.body.name,
        email: req.body.path,
        message: req.body.description,   
    });
    contact
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          status: true,
          data: contact,
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };