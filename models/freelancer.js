const  mongoose = require("mongoose");
const Role = require("../_helpers/role")
 const freelancerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
     lastName: {type: String, required: true},
     description:{type : String, required:true},
     competences:{type: String, required:true},
     cours:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cours'}],
     cin:{type: String, required: true},
     tel:{type: Number, required: true},
     email:{type: String, required: true},
     password:{type: String, required: true},
     role: {
        type: String, default: Role.Freelancer
    }
 })

 module.exports = mongoose.model("Freelancer", freelancerSchema);