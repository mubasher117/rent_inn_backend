const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Picture = new Schema({
    PropertyId : {
        type : String
    },
    Location : {
        type : String
    }
})


module.exports = mongoose.model("Picture", Picture);