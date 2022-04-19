const express = require("express");
const router = express.Router();
const contactCont = require("../controllers/contactCont");
const multerInstance = require("../middleware/file")
router.post("/saveContact",multerInstance.upload.single('file'),  contactCont.saveContact)

module.exports = router; 