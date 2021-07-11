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
    password: "",
    database: "myHomeApp"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    // if there's no error, DB is successfully connected
});
global.db = db;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}! Please go to 'http://localhost:8089' to get started.`));
