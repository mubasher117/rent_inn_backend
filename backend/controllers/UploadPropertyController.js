const UploadedProperty = require("../models/UploadedProperty");
const Login = require("../models/Login");
exports.UploadProperty = (req, res) => {
    Login.findOne({ _id: req.body.OwnerId }, (err, account) => {
        if (err) {
            console.log("Error in Server " + account)
            res.status(500).send({ 'uploadStatus': 'failure', 'err': err });
        }
        if (account == null || account == undefined) {
            console.log("Account not found")
            res.status(200).send({ 'uploadStatus': 'OwnerNotFound' });
        }
        else {
            console.log("entered in upload property successfully")
            const newProperty = new UploadedProperty(req.body);
            newProperty.save((err, property) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ 'PropertyUpload': 'failure', 'err': err });
                }
                else {
                    console.log(property)
                    res.status(200).json({ 'PropertyUpload': 'successful', 'property': property });
                }
            })
        }
    }
    );
}
exports.GetAllUploadedProperties = (req, res) => {
    console.log("got in get uploaded properties")
    UploadedProperty.find({}, (err, properties) => {
        if (err) {
            res.status(500).json({ 'PropertyShow': 'Unsuccessful', 'err': err })
        }
        else {
            console.log("Got all Properties");
            res.status(200).json({ 'PropertyShow': 'Successful', 'properties': properties })
        }
    })
}
exports.updadeInformation = (req, res) => {

    UploadedProperty.updateOne({ "_id": req.params.pizzaId }, {
        $set: {
            "lat": req.body.lat, "lan": req.body.lan,
            "rent": req.body.rent, "Address": req.body.Address,
            "PropertyType": req.body.PropertyType, "Bedrooms": req.body.Bedrooms,
            "Bathrooms": req.body.Bathrooms, "Garage": req.body.Garage,
            "AC": req.body.AC, "Area": req.body.Area,
            "Province": req.body.Province,
            "City": req.body.City,
        }
    }, { upsert: true })
        .then(data => {
            console.log(data);
            res.status(200).json({ 'Status': 'Allavailable', 'property': data });
        }).catch(err => {
            console.log('error in getting all package details')
            res.status(500).json({ 'Status': 'Failure', 'err': err });
        });
};
exports.GetSpecificUploadedProperty = (req, res) => {
    UploadedProperty.find({ OwnerId: req.params.propertyId }, (err, prop) => {
        if (err) {
            res.status(500).send({ 'propertyStatus': 'failed', 'err': err })
        }
        else {
            console.log(prop)
            res.status(200).json({ 'propertyStatus': 'found', property: prop })
        }
    })
};
exports.DeleteUploadedProperty = (req, res) => {
    UploadedProperty.deleteOne({ _id: req.params.propertyId }, (err, property) => {
        if (err) {
            res.status(500).send({ 'deleteStatus': 'failed', 'err': err })
        }
        else {
            res.status(200).json({ 'deleteStatus': 'success', 'property': property })
        }
    })
}
exports.DeleteAllUploadedProperties = (req, res) => {
    UploadedProperty.deleteMany({}, (err, remaining) => {
        if (err) {
            res.status(500).send({ 'deleteStatus': 'failed', 'err': err })
        }
        else {
            res.status(200).json({ 'deleteStatus': 'success', 'property': remaining })
        }
    })
}
