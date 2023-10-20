const { Schema, model } = require('mongoose');
const Score = require ('./Score.js');

const childSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName:
    {
        type: String,
        required: true,
        trim: true,
    },
    lastName:
    {
        type: String,
        required: true,
        trim: true,
    },
    email:
    {
        type: String

    },
    password:
    {
        type: String,
        required: true
    },
    grade:
    {
        type: Number,
    },
    age:
    {
        type: Number,
    },
score:
[
    scoreSchema
]
});

const Child = model('Child', childSchema);

module.exports = Child;