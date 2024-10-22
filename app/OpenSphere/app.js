require("dotenv").config();
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require('./config/db');
const {syncDb} = require("./config/syncDb");
const logMiddleware = require("./middlewares/logMiddleware");
const routesIndex = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(logMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/"));

// Sessions config
const sessionStore = new SequelizeStore({
    db: sequelize,
});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
		    httpOnly: true,
		    maxAge: 7200000, // 2 ore di eta massima del cookie
	    }
    })
);

syncDb();

app.use("/", routesIndex);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});