const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");
const Image =require("../models/image");
const UserLabel = require("../models/user_label");
const mongoose = require("mongoose");
const Label = require("../models/label");

exports.addLabel = catchAsync( async(req,res) => {
    const { image_id, text } = req.body;
    const newLabel = new UserLabel({
        user_id :  new mongoose.Types.ObjectId(req.auth.user.id),
        image_id: new mongoose.Types.ObjectId(image_id),
        user_label: text,
    });
    let result = await newLabel.save();
    if (result) {
        console.log("Label created by user");
    }
    sendResponse(res,{});
})

exports.editLabel = catchAsync( async(req,res) => {
    const { image_id, text } = req.body;
    console.log(image_id, text);
    const editedLabel = await UserLabel.updateOne({ user_id :  new mongoose.Types.ObjectId(req.auth.user.id), image_id: new mongoose.Types.ObjectId(image_id)},{user_label:text});
    if (editedLabel.modifiedCount === 1) {
        console.log("Label edited by user");
    }
    sendResponse(res,{});
})

exports.deleteLabel = catchAsync( async(req,res) => {
    const { image_id} = req.body;
    console.log(image_id);
    const editedLabel = await UserLabel.deleteOne({ user_id :  new mongoose.Types.ObjectId(req.auth.user.id), image_id: new mongoose.Types.ObjectId(image_id)});
    if (editedLabel.deletedCount === 1) {
        console.log("Label deleted by user");
    }
    sendResponse(res,{});
})

exports.getImagesForCommonDashboard = catchAsync( async(req,res) => {
    const groupStage = {
        $group: {
            _id: {
                imageId: '$image_id',
            },
            userLabels: { $push: '$user_label' },
        },
    };
    const unwindUserLabelsStage = {
        $unwind: '$userLabels',
    };
    const countUserLabelsStage = {
        $group: {
            _id: {
                imageId: '$_id.imageId',
                userLabel: '$userLabels',
            },
            count: { $sum: 1 },
        },
    };
    const sortUserLabelsStage = {
        $sort: {
            '_id.imageId': 1,
            count: -1,
        },
    };
    const groupByImageAndMaxCountStage = {
        $group: {
            _id: '$_id.imageId',
            topUserLabel: { $first: '$_id.userLabel' },
            count: { $first: '$count' },
        },
    };
    const sortByIdStage = {
        $sort: { _id: 1 },
    };
    const results = await UserLabel.aggregate([groupStage,unwindUserLabelsStage,countUserLabelsStage,sortUserLabelsStage,groupByImageAndMaxCountStage,sortByIdStage]);
    if(results.length > 0){
        const result = results.map(item => ({
            imageId: item._id,
            topUserLabel: item.topUserLabel,
            count: item.count,
        }));
        sendResponse(res,{result});
    }
})


exports.home = catchAsync( async(req,res) => {
    const results = await Image.aggregate([
        {
            $lookup: {
                from: "user_labels",
                let: { imageId: "$_id", userId: req.auth.user.id },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$image_id", "$$imageId"] },
                          { $eq: ["$user_id", "$$userId"] }
                        ]
                      }
                    }
                  },
                  {
                    $project: {
                        user_label: 1,
                        _id : 0
                    }
                  }
                ],
                as: "userData"
              }
        },
        {
            $unwind: {
                path: '$userData',
                preserveNullAndEmptyArrays: true, 
            },
        },
        {
            $project: {
                admin_id: 0,
                created_at: 0,
                updated_at: 0,
                __v: 0,
            }
        }
    ]);
    if(results.length > 0){
        console.log(results);
        sendResponse(res,{results});
    }
})

exports.getImage = catchAsync( async(req,res) => {
    console.log(req.body);
    const{ image_id} =req.body;
    const result = await Image.findOne({_id : new mongoose.Types.ObjectId(image_id)});
    const data = result.imageurl;
    sendResponse(res,{data});
})

exports.getLabels = catchAsync( async(req,res) => {
    const result = await Label.find({});
    sendResponse(res,{result});
})