const { body } =require("express-validator") 
module.exports.registerValidations = [
    body("name").not().isEmpty().trim().escape().withMessage("name is required"),
    body("email")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("email is required"),
    body("password")
      .isLength({ min: 6, max: 50 })
      .escape()
      .withMessage(
        "Password is required and should be minimum 6 characters long"
      ),
  ];

  module.exports.loginValidations = [
    body("email")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("email is required"),
    body("password")
    .not()
      .isEmpty()
      .escape()
      .withMessage(
        "Password is required"
      ),
  ];

  module.exports.imageUpdateValidations = [
    body("image")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("please uplaod image"),
    
  ];
  module.exports.createSchoolValidations = [
    body("name").not().isEmpty().trim().escape().withMessage("Name is required"),
    body("address").not().isEmpty().trim().escape().withMessage("address is required"),
    body("district").not().isEmpty().trim().escape().withMessage("district is required"),
    
  ];