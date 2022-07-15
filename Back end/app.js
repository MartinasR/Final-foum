require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require("express");
const whitelist = ['http://localhost:3000', 'http://example2.com'];
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.includes(origin))
            return callback(null, true)

        callback(new Error('Not allowed by CORS'));
    }
}

// serverio pajungimas
app.use(cors(corsOptions))
app.listen(4000);
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
mongoose
    .connect(process.env.MONGO_KEY)
    .then((res) => {
        console.log("connection good");
    })
    .catch((e) => {
        console.log(e);
    });
const router = require("./routes/main");

app.use("/", router);
