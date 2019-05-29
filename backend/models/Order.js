const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order  = new Schema (
    {
        PropertyId : {
            type : Schema.Types.ObjectId, ref : 'ApprovedProperty'
        }
    }
)
module.exports = mongoose.model("Order", Order);