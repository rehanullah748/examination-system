const express = require("express")
const authController = require("../controllers/auth.controller")
const {registerValidations, loginValidations, imageUpdateValidations, createSchoolValidations} = require("../validations/auth.validations")
const router = express.Router()
router.post('/auth/register',registerValidations, authController.register)
router.post('/auth/login',loginValidations, authController.login)
router.post('/auth/logout', authController.logOut)
router.put('/auth/update-image',imageUpdateValidations , authController.updateImage)
router.get('/auth/user-profile', authController.getProfile );
router.post('/auth/create-school',createSchoolValidations, authController.createSchool );
router.put('/auth/update-school',createSchoolValidations, authController.updateSchool );


module.exports = router