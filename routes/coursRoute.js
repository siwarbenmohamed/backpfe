const express = require("express");
const router = express.Router();
const coursCont = require("../controllers/coursCont");
const multerInstance = require("../middleware/file")
router.post("/saveCours",multerInstance.upload.single('file'),  coursCont.saveCours)

module.exports = router;