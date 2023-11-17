const User = require("../models/user");
const bcrypt = require("bcrypt");


module.exports = (mongoose) => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    async function customFunction() {
        const existingUser = await User.findOne({ username: "manu4477" });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash("manoj", 10);
            const newUser = new User({
                username : "manu4477",
                password: hashedPassword,
                type: "admin"
            });
            await newUser.save();
        }
    }
    const mongoCon = mongoose.connection;
    mongoCon.on("open", () => {
        console.log("Connected to MongoDB");
        customFunction();
    });
};