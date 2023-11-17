const catchAsync = require("../utilities/catch-async");
const { uploadService } = require("../services");
const { sendResponse } = require("../utilities/responses");

exports.singleS3 = catchAsync(async (req, res) => {
    console.log(req.files);
    const { file } = req.files;
    const { type } = req.body;
    const data = await uploadService.singleS3({ file, type });
    console.log(data);
    return sendResponse(res, data);
  });