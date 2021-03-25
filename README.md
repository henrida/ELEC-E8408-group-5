# ELEC-E8408-group-5
This is the repository for the miniproject of group 5 for the course ELEC-E8408 Embedded Systems Development at Aalto University.
The goal of this project was to create a web application to schedule boat tours as well as an embedded application for the raspberry pi which shows relevant information of these tours. This repository solely contains the web application segment of the project.

## Dependencies
The dependencies that are used in this project can be found in the main folder in the "package.json" file.

## Additional Notes
Since this is meant as an initial prototype of the project certain variables have been hardcoded. These variables include the users, i.e. the tour guides that can log in. These guides have the ids 1 and 2, which are necessary to login into the application. Other notable variables are the ip addresses of the json server. Later on is explained how to start the json server, after which the server will run on your personal ip address. In order to make sure that the rest of the application also uses this ip address, you should change the ip address in the files:
* App.js on line 20, file can be found in the src folder
* guides.js on line 2, file can be found in the src/services folder
* ports.js on line 2, file can be found in the src/services folder
* tours.js on line 3, file can be found in the src/services folder

## Running the application
To run web application part:
* Go to "miniproject" folder in command prompt
* Run command "npm install" (not sure if necessary)
* Run command "npm start"
* Application will run on  http://localhost:3000

To start the database:
* Go to "miniproject/src" folder in command prompt
* Run command "npx json-server --port 3001 --watch --host ip db.json", where ip is replaced with your personal ip address
* Database will be accessible on http://ip:3001, again where ip is replaced with your personal ip address

