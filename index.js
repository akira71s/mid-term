// CREATE TABLE mySmartHomeDevices(id INT(10) AUTO_INCREMENT, deviceName VARCHAR(32), temperture INT(10), volume INT(10), isOn BOOLEAN, isOpen BOOLEAN, PRIMARY KEY(id));

// C1: Code is organised into JavaScript (.js) files and template files (.html or .ejs or .pug).
// - JavaScript files contain web server code(index.js) and middleware(main.js in routes folder). 

var http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8089;
require("./routes/main")(app);

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test", // TODO CHANGE!
    database: "myHomeApp"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to db");
});
global.db = db;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
