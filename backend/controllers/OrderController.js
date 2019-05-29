const Order = require("../models/Order");
const ApprovedProperty = require("../models/ApprovedProperty");
const UploadedProperty = require("../models/UploadedProperty");

exports.MakeOrder = (req, res) => {
    ApprovedProperty.findOne({ _id: req.body.PropertyId }, (err, property) => {
        if (err) {
            res.status(500).json({ 'OrderStatus': 'failure', 'err': err })
        }
        else if (property == null || property == undefined) {
            res.status(200).json({ 'OrderStatus': 'OrderNotMade' })
        }
        else {
            const newOrder = new Order(req.body);
            newOrder.save((err, order) => {
                if (err) {
                    res.status(500).json({ 'OrderStatus': 'failure', 'err': err })
                }
                else {
                    res.status(200).json({ 'OrderStatus': 'success', 'order': order })
                }
            })
        }

    })
}





exports.GetAllOrders = (req, res) => {
    console.log("got in get uploaded properties")
    Order.find({}, (err, orders) => {
        if (err) {
            res.status(500).json({ 'PropertyShow': 'Unsuccessful', 'err': err })
        }
        else {
            console.log("Got all Properties");
            res.status(200).json({ 'PropertyShow': 'Successful', 'properties': orders })
        }
    })
}

exports.DeleteOrder = (req, res) => {
    Order.findOne({ _id: req.body.id }, (err, order) => {
        if (err) {
            res.status(500).json({ 'OrdersStatus': 'Error', 'err': err })
        }
        else {
            ApprovedProperty.findOne({ _id: order.PropertyId }, (err, AppProp) => {
                if (err) {
                    res.status(500).json({ 'ApprovedPropertyStatus': 'Error', 'err': err })
                }
                else {
                    UploadedProperty.deleteOne({ _id: AppProp.PropertyId }, (err, UpProp) => {
                        if (err) {
                            res.status(500).json({ 'DeleteUploadedPropertyStatus': 'Error', 'err': err })
                        }
                        else {
                            res.status(200).json({ 'UloadedPropDeleteStatus': 'Success', 'result': residual })
                        }
                    })
                }
            })
            ApprovedProperty.deleteOne({ _id: order.PropertyId }, (err, response) => {
                if (err) {
                    res.status(500).json({ 'DeleteApprovedPropertyStatus': 'Error', 'err': err })
                }
                else {
                    res.status(200).json({ 'DeleteApprovedStatus': 'Success', 'result': residual })
                }
            })

        }
    })






    Order.deleteOne({ _id: req.body.id }, (err, property) => {
        if (err) {
            res.status(500).send({ 'deleteStatus': 'failed', 'err': err })
        }
        else {
            res.status(200).json({ 'deleteStatus': 'success', 'property': property })
        }
    })
}

exports.GetSpecificOrder = (req, res) => {
    Order.find({ _id: req.body.id }, (err, order) => {
        if (err) {
            res.status(500).send({ 'getStatus': 'failed', 'err': err })
        }
        else if (order == null || order == undefined) {
            res.status(200).json({ 'getStatus': 'PropertyNotFound' })
        }
        else {
            ApprovedProperty.findOne({ _id: req.order.PropertyId }, (err, property) => {
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
    })
}

exports.DeleteAllOrders = (req, res) => {
    Order.find({}, (err, orders) => {
        if (err) {
            res.status(500).json({ 'OrdersStatus': 'Error', 'err': err })
        }
        else {
            console.log(orders)
            for (var i = 0; i < orders.length; ++i) {
                console.log(orders[i].PropertyId);
                ApprovedProperty.findOne({_id: orders[i].PropertyId}, (err, AppProp) => {
                    if (err) {
                        res.status(500).json({ 'ApprovedPropertyStatus': 'Error', 'err': err })
                    }
                    else {
                        console.log(AppProp.PropertyId);
                        UploadedProperty.deleteOne({ _id: AppProp.PropertyId }, (err, UpProp) => {
                            if (err) {
                                res.status(500).json({ 'DeleteUploadedPropertyStatus': 'Error', 'err': err })
                            }
                            else {
                                res.status(200).json({ 'UloadedPropDeleteStatus': 'Success', 'result': residual })
                            }
                        })
                    }
                })
                ApprovedProperty.deleteOne({ _id: orders[i].PropertyId }, (err, response) => {
                    if (err) {
                        res.status(500).json({ 'DeleteApprovedPropertyStatus': 'Error', 'err': err })
                    }
                    else {
                        res.status(200).json({ 'DeleteApprovedStatus': 'Success'})
                    }
                })
            }
        }
    })

    Order.deleteMany({}, (err, residual) => {
        if (err) {
            res.status(500).json({ 'DeleteAllStatus': 'Error', 'err': err })
        }
        else {
            res.status(200).json({ 'DeleteAllStatus': 'Success' })
        }
    })
    
}