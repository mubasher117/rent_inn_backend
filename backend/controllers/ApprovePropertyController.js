const UploadedProperty = require("../models/UploadedProperty");
const ApprovedProperty = require("../models/ApprovedProperty");

exports.ApproveProperty = (req, res) => {
    UploadedProperty.findOne({ _id: req.body.PropertyId }, (err, property) => {
        if (err) {
            res.status(500).json({ 'approveStatus': 'failure', 'err': err })
        }
        else if (property == null || property == undefined) {
            res.status(200).json({ 'approveStatus': 'PropertyNotFound' })
        }
        else {
            const AppProp = new ApprovedProperty(req.body);
            AppProp.save((err, property) => {
                if (err) {
                    res.status(500).json({ 'approveStatus': 'failure', 'err': err })
                }
                else {
                    res.status(200).json({ 'approveStatus': 'success', 'property': property })
                }

            })
        }

    })
}






exports.GetAllApprovedProperties = (req, res) => {
    console.log("got in get uploaded properties")
    ApprovedProperty.find({}, (err, properties) => {
        if (err) {
            res.status(500).json({ 'PropertyShow': 'Unsuccessful', 'err': err })
        }
        else {
            console.log("Got all Properties");
            res.status(200).json({ 'PropertyShow': 'Successful', 'properties': properties })
        }
    })
}

exports.GetSpecificApprovedProperty = (req, res) => {
    ApprovedProperty.findOne({ _id: req.body.id }, (err, property) => {
        if (err) {
            res.status(500).send({ 'getStatus': 'failed', 'err': err })
        }
        else if (property == null || property == undefined) {
            res.status(200).json({ 'getStatus': 'PropertyNotFound' })
        }
        else {
            UploadedProperty.findOne({ _id: property.PropertyId }, (err, mainProperty) => {
                if (err) {
                    res.status(500).send({ 'getStatus': 'failed', 'err': err })
                }
                else if (mainProperty == null || mainProperty == undefined) {
                    res.status(200).json({ 'getStatus': 'PropertyNotFound' })
                }
                else {
                    res.status(200).json({ 'getStatus': 'success', 'property': mainProperty })
                }
            })
        }
    })
}
exports.DeleteApprovedProperty = (req, res) => {
    ApprovedProperty.deleteOne({ _id: req.body.id }, (err, property) => {
        if (err) {
            res.status(500).send({ 'deleteStatus': 'failed', 'err': err })
        }
        else {
            UploadedProperty.deleteOne({ _id: property.PropertyId }, (err, mainProperty) => {
                if (err) {
                    res.status(500).send({ 'deleteStatus': 'failed', 'err': err })
                }
                else {
                    res.status(200).json({ 'deleteStatus': 'success', 'property': property })
                }
            })
        }
    })
}

