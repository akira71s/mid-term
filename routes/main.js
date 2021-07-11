// the app name is an constant
const APP_NAME = "MySmartHome";
module.exports = function (app) {

  // GET:/ => renders and return the index page 
   app.get("/", 
   function (req, res) {
     res.render("index.html", {
      appName: APP_NAME
     });
   }); 
  
  // GET:/about => renders and returns the TOP page 
  app.get("/about", function (req, res) {
    res.render("about.html", {
      appName: APP_NAME
    });
  });
  
  // GET:/add-device => renders and returns the Add Device page 
  app.get("/add-device", function (req, res) {
    res.render("add-device.html", {
      appName: APP_NAME
    });
  });

  /** 
   * POST:/add-device => 
   *  deals with an INSERT operation into the DB
   *  then renders and returns the "device-registered" page (which shows a message) 
   *  after successful DB operation
   */ 
  app.post("/add-device", function (req, res) {
    const body = req.body;
    // if undefined, set status to "null". It's going to be a flag to show "N/A"
    if(body.isOpen === undefined) body.isOpen = null;    
    if(body.isOn === undefined) body.isOn = null;
    // INSERT device data into table: mySmartHomeDevices
    const sqlquery = "INSERT INTO mySmartHomeDevices (deviceName, deviceType, temperature, volume, isOn, isopen) VALUES (?,?,?,?,?,?)";
    const newRecordFields = [body.deviceName, body.deviceType, body.temperature, body.volume, body.isOn, body.isOpen];
    db.query(sqlquery, newRecordFields, (err, result) => {
      if (err) {
        // if error happens, log error info then thros an error
        console.log(err);
        throw err;
      } else {
        // if the data is saved successfully in the DB, renders and returns a page to show a success message
        res.render("device-registered.html", {
          appName: APP_NAME,
          deviceType: body.deviceType,
          id: result.insertId
        });
      }
    });
  });

  // GET:/device-status-dashboard => renders and returns the device status dashboard 
  app.get("/device-status-dashboard", function (req, res) {
    // Query all the devices from the table 'mySmartHomeDevices'
    let sqlquery = `SELECT * FROM mySmartHomeDevices`
    db.query(sqlquery, (err, result) => {
      if (err) {
        // if error happens, log error info then thros an error
        console.log(err);
        throw err;
      }
      // renders and returns the dashboard page with data for all the devices 
      res.render("device-status-dashboard.html", {
        appName: APP_NAME,
        devices: result
      });
    });
  });

  /**
   * GET:/select-device-to-update=> renders and returns the device update dashboard 
   * where they can see all the decices to choose to update 
   */
  app.get("/select-device-to-update", function (req, res) {
    // Query all the devices from the table 'mySmartHomeDevices'
    let sqlquery = `SELECT * FROM mySmartHomeDevices`
    db.query(sqlquery, (err, result) => {
      if (err) {
        // if error happens, log error info then thros an error
        console.log(err);
        throw err;
      }
      // renders and returns the dashboard page with data for all the devices, so that users can choose what to update 
      res.render("select-device-to-update.html", {
        appName: APP_NAME,
        devices: result
      });
    });
  });

  /**
   * GET:/update-device => renders and returns the device update page 
   *  for a particular device selected on 'select-device-to-update'
   */
  app.get("/update-device", function (req, res) {
    res.render("update-device.html", {
      appName: APP_NAME
    });
  });

  /** 
   * POST:/select-device-to-update=> 
   *  deals with a SELECT operation for a selected device which a user has deviced to update 
   *  then renders and returns the "update-device" page 
   *  where uses can edit fields where applicable for the selected device 
   */ 
  app.post("/select-device-to-update", function (req, res) {
    const id = req.body.id;
    let sqlquery = `SELECT * FROM mySmartHomeDevices WHERE id = ${id}`;
    db.query(sqlquery, (err, result) => {
      if (err) {
        // if error happens, log error info then thros an error
        console.log(err);
        throw err;
      }
      res.render("update-device.html", {
        appName: APP_NAME,
        id: result[0].id,
        deviceType: result[0].deviceType,
        temperature: result[0].temperature,
        volume: result[0].volume,
        isOn: result[0].isOn,
        isOpen: result[0].isOpen
      });
    });
  });

  /** 
   * POST:/update-device => 
   *  deals with an UPDATE operation
   *  then renders and returns the "device-registered" page (which shows a message) 
   *  after successful DB operation
   */ 
  app.post("/update-device", function (req, res) {
    const id = req.body.id;
    const deviceType = req.body.deviceType;
    const temperature = req.body.temperature || null;
    const volume = req.body.volume || null;
    const isOpen = req.body.isOpen || null;
    const isOn = req.body.isOn || null ;
    // UPDATE fields for the device the id of which  is equals to req.body.id
    let sqlquery = `
      UPDATE 
        mySmartHomeDevices 
      SET 
        temperature = ${temperature},
        volume = ${volume},
        isOpen = ${isOpen},
        isOn = ${isOn}
      WHERE 
        id = ${id}
    `;
    db.query(sqlquery, (err, result) => {
      if (err) {
        // if error happens, log error info then thros an error
        console.log(err);
        throw err;
      }
      // renders and returns the device-updated page where uses can see a success message
      res.render("device-updated.html", {
        appName: APP_NAME,
        id: id,
        deviceType: deviceType
      });
    });
  });

  /**
   * GET:/delete-device => renders and returns the device delete page 
   *  where uses can choose which device to be deleted from the DB
   */
  app.get("/delete-device", function (req, res) {
    // SELECT all the devices to list in the page so that uses can choose what to be deleted
    let sqlquery = `SELECT * FROM mySmartHomeDevices`
    db.query(sqlquery, (err, result) => {
      if (err) {
        // if error happens, log error info then thros an error
        console.log(err);
        throw err;
      }
      res.render("delete-device.html", {
        appName: APP_NAME,
        devices: result
      });
    });
  });

  /** 
   * POST:/delete-device=> 
   *  deals with a DELETE operation
   *  then renders and returns the "device-deleted" page (which shows a message) 
   *  after successful DB operation
   */ 
  app.post("/delete-device", function (req, res) {
    const id = req.body.deviceId;
    // DELETE a row for the device the id of which is equals to req.body.deviceId
    let sqlquery = `DELETE FROM mySmartHomeDevices WHERE id=` + id;
    db.query(sqlquery, (err, result) => {
      if(err){
        // if error happens, log error info then thros an error
        console.log(err);
        throw err;
      }
      // renders and returns the device-deleted page where uses can see a success message
      res.render("device-deleted.html", {
        appName: APP_NAME,
        id
      });
    });
  });
}
