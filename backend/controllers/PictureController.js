const Picture = require('../models/Picture')
const UploadProperty = require('../models/UploadedProperty')
exports.AddImage = (req, res) => {
    const PropertyId = req.body.PropertyId
    UploadProperty.findOne({ _id: PropertyId }, (err, property) => {
        console.log(property)
        const l =[];
        if (err) {
            res.status(500).json({ 'PropertyStatus': 'Failed', 'err': err })
        }
        else if (property==null || property == undefined ) {
            console.log("entered ib not found")
            res.status(200).js.on({ 'PropertyStatus': 'NotFound' })
        }
        else {
            console.log("found")
            const image = new Picture(req.body)
        
        image.save((err, picture) => {
            if (err) {
                res.status(500).json({ 'PictureStatus': 'Failed', 'err': err })
            }
            else {
                res.status(200).json({ 'PictureStatus': 'Added', 'Picture': picture })
            }
        })
    }
    })
}
exports.GetPropertyImages = (req, res) => {
    Picture.find({ PropertyId: req.params.PropertyId }, (err, Pictures) => {
        if (err) {
            res.status(500).json({ 'PictureStatus': 'Failed', 'err': err })
        }
        else {
            res.status(200).json({ 'PictureStatus': 'GotAllPictures', 'Pictures': Pictures })
        }
    })
    
}
exports.GetAllImages = (req, res) =>{
    Picture.find({ }, (err, Pictures) => {
        if (err) {
            res.status(500).json({ 'PictureStatus': 'Failed', 'err': err })
        }
        else {
            res.status(200).json({ 'PictureStatus': 'GotAllPictures', 'Pictures': Pictures })
        }
    })
}