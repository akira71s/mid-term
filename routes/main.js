// C1: Code is organised into JavaScript (.js) files and template files (.html or .ejs or .pug).
  // - JavaScript files contain web server code(index.js) and middleware(main.js in routes folder). 


// C2: Each route in main.js has comments describing purpose, inputs, and outputs

const APP_NAME = "MySmartHome";
module.exports = function (app) {
   // R1: Home Page
   app.get("/", function (req, res) {
     res.render("index.html", {
       appTitle: APP_NAME,
       // R1A: Display the name of the web application.
       appName: APP_NAME,
     });
   }); 
  
  // R2: About page:
  app.get("/about", function (req, res) {
    res.render("about.html", {
      appTitle: APP_NAME,
      appName: APP_NAME,
    });
  });
  
  // R3: Add device page:
  app.get("/add-device", function (req, res) {
    res.render("add-device.html", {
      appTitle: APP_NAME,
      appName: APP_NAME,
    });
  });

  //　Add Device to the table: mySmartHomeDevices
  app.post("/add-device", function (req, res) {
    const body = req.body;
    const sqlquery = "INSERT INTO mySmartHomeDevices (deviceName, temperature, volume, isOn, isopen) VALUES (?,?,?,?,?)";
    const newrecord = [body.deviceName, body.temperature, body.volume, body.isOn, body.isOpen];
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else
        res.send(" This device is added to database, name: " + body.deviceName);
    });
  });

  // R4: Show device status page
  app.get("/device-status", function (req, res) {
    let sqlquery = `SELECT * FROM mySmartHomeDevices`
    db.query(sqlquery, (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(result);
      res.render("device-status.html", {
        appTitle: APP_NAME,
        appName: APP_NAME,
        devices: result
      });
    });
  });

  // R5: Update device status page
  app.get("/update-device", function (req, res) {
    res.render("update-device.html", {
      appTitle: APP_NAME,
      appName: APP_NAME,
    });
  });

  // R6: Delete device page
  app.get("/delete-device", function (req, res) {
    res.render("delete-device.html", {
      appTitle: APP_NAME,
      appName: APP_NAME,
    });
  });
}

// <form method="POST" action="/registered">
//   <input id="first" type="text" name="first" value="first name" />
//   <input id="last" type="text" name="last" value="last name" />
//   <input type="submit" value="OK" />
// </form>

// app.get("/register", function (req, res) {
//   res.render("register.html");
// });
// app.post("/registered", function (req, res) {
//   // saving data in database
//   res.send(req.body)
// });



// <form action = "/search-result" method = "GET" >
//     <input id="search-box" type="text" name="keyword" value="Default">
//       <input type="submit" value="OK" >
// </form>


// app.get("/search-result", function (req, res) {
//  //searching in the database
//  res.send(req.query);
// });

// DB
  // mysql
  // SHOW DATABASES;
  // CREATE DATABASE myBookshop
  // USE myBookshop; 
  // CREATE TABLE books (id INT AUTO_INCREMENT, name VARCHAR(50), price DECIMAL(5, 2) unsigned, PRIMARY KEY(id));
  // INSERT INTO TableName(name, price) VALUES('database book', 40.25), ('Node.js book',25.00), ('Express book', 31.99); 
  // DESCRIBE books
  // SELECT filedName1, fieldName2 FROM TableName; OR SELECT * FROM TableName;
  // SELECT * FROM TableName LIMIT 2;
  // SELECT name, price FROM books WHERE id=2;

  // CREATE TABLE dishes (id INT AUTO_INCREMENT, name VARCHAR(50), price
  //   DECIMAL(5, 2) unsigned, is_vegetarian BOOLEAN, is_vegan BOOLEAN, PRIMARY KEY(id))
  // SELECT filedName1, fieldName2 FROM TableName; 
  // UPDATE TableName SET filedName1 = new- value1, fieldName2 = new- value2;
  // UPDATE books SET price = 25.50 WHERE id = 1
  // DELETE FROM books WHERE id = 1
  // exit


  // Code style and technique
// Your code should be written according to the following style and technique guidelines:


// C3: Code is laid out clearly with consistent indenting
// C4: Each database interaction has comments describing the purpose, inputs, and outputs
// C5: Functions and variables have meaningful names, with a consistent naming style


//D1: URL Link to the application environment

//D2: documentation report is in PDF format

//D3: List of requirements: for each sub-requirement (R1A → R6B) state how this was
  //achieved or if it was not achieved. Explain where it can be found in the code. Use focused,
  //short code extracts if they make your explanation clearer.

//D4: Database structure: tables including purpose, field names, and data types for each table.