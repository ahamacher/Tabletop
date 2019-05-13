const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateMessageInput(data) {
    let errors = {};

    data.text = validText(data.text) ? data.text : "";

    if (!Validator.isLength(data.text, { min: 1, max: 255 })) {
        errors.text = "Message must be between 1 and 255 characters";
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = "Text field is required";
    }

    return {
        errors, 
        isValid: Object.keys(errors).length === 0
    };
};