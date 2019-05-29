const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApprovedProperty  = new Schema (
    {
        PropertyId : {
            type : Schema.Types.ObjectId, ref : 'UploadedProperty'
        }
    }
)
module.exports = mongoose.model("ApprovedProperty", ApprovedProperty);