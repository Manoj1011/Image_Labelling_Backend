const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { xss } = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize');
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const connect = require("./services/connection");
const routes = require("./routes");
const allowedOrigins = ['http://localhost:3000'];
connect(mongoose);

app.use(fileUpload({
    createParentPath: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204,
}));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/", routes);

app.all('/*', (req, res) => {
    res.status(404).send({ errno: 404, message: 'Endpoint not found', type: "INVALID_ENDPOINT" });
});

app.listen(process.env.PORT || 4001, () => {
    console.log(`Listening on ${process.env.PORT || 4001}`)
});
