const Cours = require("../models/cours");


exports.saveCours = (req, res, next) => {
  

    const cours = new Cours({
       name: req.body.name,
        file: req.file.path,
        description: req.body.description,   
    });
    cours
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          status: true,
          data: cours,
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
