const { body } = require("express-validator");

module.exports.createStudentValidations = [
    body("reg_no").not().isEmpty().trim().escape().withMessage("reg_no is required"),
    body("name").not().isEmpty().trim().escape().withMessage("Name is required"),
    body("f_name").not().isEmpty().trim().escape().withMessage("father Name is required"),
    body("address").not().isEmpty().trim().escape().withMessage("address is required"),
    body("dob").not().isEmpty().trim().escape().withMessage("DOB is required"),
    body("clas").not().isEmpty().trim().escape().withMessage("class is required"),
    body("domicile").not().isEmpty().trim().escape().withMessage("domicile is required"),
    
  ];