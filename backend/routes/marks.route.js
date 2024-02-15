const express = require("express")
const marksConroller = require("../controllers/marks.conroller")

const router = express.Router()
router.post('/marks/create-marks', marksConroller.CreateMarks )

module.exports = router