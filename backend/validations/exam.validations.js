const { body, query } = require("express-validator");

module.exports.createExamValidations = [
    body("session").not().isEmpty().trim().escape().withMessage("session is required"),
    body("clas").not().isEmpty().trim().escape().withMessage("class is required"),
    body("examType").not().isEmpty().trim().escape().withMessage("exam type is required"),
    body("reg_no").not().isEmpty().trim().escape().withMessage("reg_no is required"),
   
    
  
  ];
  module.exports.checkExamTypeValidations = [
    query("examType").not().isEmpty().trim().escape().withMessage("exam Type is required"),
    query("reg_no").not().isEmpty().trim().escape().withMessage("reg_no is required"),
    query("clas").not().isEmpty().trim().escape().withMessage("class is required"),
    query("session").not().isEmpty().trim().escape().withMessage("session is required"),
    
    

  ];

