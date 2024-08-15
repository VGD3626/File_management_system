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

    url: {
        type: String,
        required: true
    }, 

    size: {
        type: String
    }
})

var File = mongoose.model("File", fileSchema);
module.exports = File;