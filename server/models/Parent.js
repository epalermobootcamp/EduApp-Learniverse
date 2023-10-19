const { Schema, model } = require('mongoose');
const Child =  require ('./Child.js');


const parentSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    parentFirstName:
    {
        type: String,
        required: true,
        trim: true,
    },
    parentLastName:
    {
        type: String,
        required: true,
        trim: true,
    },
    email:
    {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    subscribed: {
        type: Boolean,
        required: true
    },
    children: [
{
    type: mongoose.Schema.ObjectId,
    ref: "Child"
}
    ],

});

const Parent = model('Parent', parentSchema);

module.exports = Parent;