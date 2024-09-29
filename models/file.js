const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;


const fileSchema = new Schema ({
    name: {
        type: String,
        required: true
    },

    fileType: {
        type: String,
        required: true
    },

    path: {
        type: String,
        required: true,
        unique: true
    },

    parentFolder: {
        type: ObjectId,
        required: true
    },

    owner: {
        type: ObjectId,
        required: true
    },

    size: {
        type: String
    },

    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],

})

var File = mongoose.model("File", fileSchema);
module.exports = File;
