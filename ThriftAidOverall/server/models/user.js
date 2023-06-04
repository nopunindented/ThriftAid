const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	userType: { type: String, enum: ['Thrift Store', 'Homeless Shelter'] },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		userType: Joi.string().valid('Thrift Store', 'Homeless Shelter').required().label("User Type"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
