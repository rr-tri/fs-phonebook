const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /\d{4}-\d{10}/.test(value);
            },
            message: (props) => `${props.value} is not a valid phone number. Format: 0977-1234567899`,
        },
        required: [true, 'User phone number required XX-XXXXXXXX']
    },
});

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;