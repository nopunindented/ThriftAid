const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.usertype = !isEmpty(data.usertype) ? data.usertype : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
  if (Validator.isEmpty(data.usertype) && Validator.isLength(data.password, { min: 8, max: 30 }) && !Validator.isEmpty(data.email) && !Validator.isEmpty(data.password) && !Validator.isEmpty(data.password2) && Validator.equals(data.password, data.password2)) {
    errors.usertype = "Must pick an account type";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password) && !Validator.isEmpty(data.email)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2) && !Validator.isEmpty(data.email) && !Validator.isEmpty(data.password)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 8, max: 30 }) && !Validator.isEmpty(data.password) && !Validator.isEmpty(data.email) && !Validator.isEmpty(data.password2)) {
    errors.password = "Password must be at least 8 characters";
  }
if (!Validator.equals(data.password, data.password2) && !Validator.isEmpty(data.password) && !Validator.isEmpty(data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};