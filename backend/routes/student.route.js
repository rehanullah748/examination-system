const express = require("express")
const studentController = require("../controllers/student.controller")
const { createStudentValidations } = require("../validations/student.validation")
const router = express.Router()
router.post('/student/create-student', createStudentValidations, studentController.CreateStudent)
router.get('/student/get-all-students',  studentController.getAllStudents)
router.delete('/student/delete-student/:id',  studentController.deleteStudent)
router.get('/student/student-details/:id',  studentController.getStudentDetails)
router.put('/student/update-student/:id', createStudentValidations,  studentController.updateStudent) 

module.exports = router