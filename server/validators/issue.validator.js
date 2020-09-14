const { check } = require("express-validator");

exports.issueValidator = [
  check("title").not().isEmpty().withMessage({title:"The title field is required"}),
  check("comment").not().isEmpty().withMessage({comment:"The comment field is required"}),
];  
