const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utilities/jwt");
const { sessionManager } = require("../services"); 

exports.signup = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    const existingUser = await User.findOne({ username: username.trim().toLowerCase() });
    if (existingUser) {
      throwError("User with email already exists","CONFLICT",409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username : username.trim(),
      password: hashedPassword,
    });
    await newUser.save();
    sendResponse(res,{});
  });

exports.signin = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username : username.trim().toLowerCase() });
    if (!user) {
      throwError("No such user","UNAUTHORIZED",401);
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throwError("Password didn't match","UNAUTHORIZED",401);
      return;
    }
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const session = await sessionManager.createSession(
      user._id,
      ip,
      req.headers["user-agent"]
    );
    // Generate a JWT token for the user
    const token = generateToken({ session: session._id });
    sendResponse(res,{token,user});
});

