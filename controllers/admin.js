const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");
const User = require("../models/user");
const Image =require("../models/image");
const Label = require("../models/label");
const mongoose = require("mongoose");

exports.createLabel = catchAsync(async (req, res) => {
    const { label } = req.body;
    console.log(req.body);
    const check = Label.findOne({label});
    if(check){
        console.log("already created by admin");
    }
    const newLabel = new Label({
        label,
        admin_id :  new mongoose.Types.ObjectId(req.auth.user.id),
    });
    let result = await newLabel.save();
    if (result) {
        console.log("Label created by admin");
    }
    sendResponse(res,{});
  });


exports.deleteLabel = catchAsync( async(req,res) => {
    const { label } = req.body;
    user_id = new mongoose.Types.ObjectId(req.auth.user.id);
    const filter = { admin_id: user_id, label };
    const labelDelete = await Label.deleteOne(filter);
    if (labelDelete.deletedCount === 1) {
        console.log("Label is deleted by admin");
    }
    return sendResponse(res, {});
})


exports.createImage = catchAsync(async (req, res) => {
    const { s3url } = req.body;
    console.log(req.body);
    const newImage = new Image({
        imageurl : s3url,
        admin_id :  new mongoose.Types.ObjectId(req.auth.user.id),
    });
    let result = await newImage.save();
    if (result) {
        console.log("Image created by admin");
    }
    sendResponse(res,{});
  });