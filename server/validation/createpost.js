const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateProfileInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.establishmentname = !isEmpty(data.establishmentname) ? data.establishmentname : "";
  data.website = !isEmpty(data.website) ? data.website: "";
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : "";
// Name checks
// Email checks
if (Validator.isEmpty(data.establishmentname)) {
    errors.establishmentname = "Business/Homeless Shelter field is required";
  }
// Password checks
  if (Validator.isEmpty(data.website) && !Validator.isEmpty(data.establishmentname)) {
    errors.website = "Website field is required";
  }
if (Validator.isEmpty(data.phonenumber) && !Validator.isEmpty(data.website) && !Validator.isEmpty(data.establishmentname)) {
    errors.password2 = "Phone number is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};