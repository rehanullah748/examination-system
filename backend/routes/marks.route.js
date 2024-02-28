const express = require("express")
const marksController = require("../controllers/marks.conroller")
const { createExamValidations, checkExamTypeValidations } = require("../validations/exam.validations")

const router = express.Router()
router.post('/marks/create-marks',createExamValidations, marksController.CreateMarks )
router.get('/marks/get-all-students-for-marks', createExamValidations,  marksController.getAllStudentForMarks)
router.get('/marks/get-student-by-examType', checkExamTypeValidations,  marksController.getStudentByExamType)
router.put('/marks/update-marks',createExamValidations,  marksController.updateMarks)


module.exports = router