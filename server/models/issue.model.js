const { Schema, model } = require("mongoose");

const IssueSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    comment: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt:{
        type: String,
    },
    isOpen: {
        type: Boolean,
        default:true
    },

}, { timestamps: true })

module.exports=model("Issue",IssueSchema)