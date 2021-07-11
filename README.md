How the DB was configured:

1. ```mysql```

2. ```CREATE DATABASE myHomeApp;```

3. ```USE myHomeApp;```

4. ```CREATE TABLE mySmartHomeDevices(id INT(10) AUTO_INCREMENT, deviceName VARCHAR(255) NOT NULL, deviceType VARCHAR(255) NOT NULL, temperature DECIMAL(5,2), volume INT(10), isOn BOOLEAN, isOpen BOOLEAN, PRIMARY KEY(id));```
