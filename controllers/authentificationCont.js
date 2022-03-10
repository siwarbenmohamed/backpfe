const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Freelancer = require("../models/freelancer");
const Client = require("../models/client");
const jwt = require("jsonwebtoken");
const config = require("../middleware/config.json");

exports.signup =  async (req, res) => {
    //checking if user email already exixts
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        res.status(400).send("Email already exists");
        return;
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //on process of adding new user
    const user = new User({
        firstName: req.body.firstName,   
        email: req.body.email,
        lastName: req.body.lastName,
        password: hashedPassword
    });
    const saveUser = await user.save();
    res.status(200).send("user created");
    res.json(saveUser);

};
//signin route
/*exports.signin = async (req, res) => {
    User.findOne({ mail: req.body.mail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Wrong password !' });
          }
          
          res.status(200).json({
            user,
            token: jwt.sign({
              data: user,
          }, config.secretKey)       
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
*/

exports.signin = async (req, res) =>{
     User.findOne({
      email: req.body.email
  }, function(err, user) {
      if (err) throw err;

      if (!user) {

         Freelancer.findOne({
              email: req.body.email
          }, function(err, user) {
              if (err) throw err;

              if (!user) {
                  return res.send({
                      success: false,
                      msg: 'Authentication failed. User not found.',
                  });
                  //  console.log(msg);

              } else {
                  // check if password matches
                    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                      if (isMatch && !err) {
                          // if user is found and password is right create a token
                          var token = jwt.sign({_id: user._id, role: user.role}, config.secret,
                          {   expiresIn: '1h',
                          });
                          // return the information including token as JSON
                           res.json({
                              success: true,
                              token: token,
                              role: 'freelancer',
                              user:user
                          });
                      } else {
                          return res.send({
                              success: false,
                              msg: 'Authentication failed. Wrong password.'
                          });
                      }
                  });
              }
          }),
           Client.findOne({
              email: req.body.email
          }, function(err, user) {
              if (err) throw err;

              if (!user) {
                 return res.send({
                      success: false,
                      msg: 'Authentication failed. User not found.',
                  });
                  //  console.log(msg);

              } else {
                  // check if password matches
                   bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                      if (isMatch && !err) {
                          // if user is found and password is right create a token
                          var token = jwt.sign({_id: user._id, role: user.role}, config.secret,
                          {   expiresIn: '1h',
                          });
                          res.setHeader('Content-Type', 'text/plain');
                          // return the information including token as JSON
                          res.json({
                              success: true,
                              token: token,
                              role: 'client',
                              user:user
                          });
                      } else {
                        return  res.send({
                              success: false,
                              msg: 'Authentication failed. Wrong password.'
                          });
                      }
                  });
              }
          })
          ;

      } else {
          // check if password matches
           bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
              if (isMatch && !err) {
                  // if user is found and password is right create a token
                  var token = jwt.sign({_id: user._id, role: user.role}, config.secret,  { expiresIn: '1h' });
                  // return the information including token as JSON
                  res.json({
                      success: true,
                      token: token,
                      role: "admin",
                      user:user
                  });
              } else {
                return  res.send({
                      success: false,
                      msg: 'Authentication failed. Wrong password.'
                  });
              }
          });
      }
  });
}
