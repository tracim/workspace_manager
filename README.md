[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Tracim Workspace Manager
Allows to configure all the roles of a Tracim workspace in one place through a wizzard

## Setup
### Node js
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### install all dependencies
```
npm install
```

### Start mock api server
```
npm run start-static-mockapi
```
Api will listen to port 3001 by default. You can change the port by editing GLOBAL_PORT variable in api/server.js
Dont forget to edit the apiPath html attribute of where you want to insert the workspace manager

#### To run and test the app immediatly
```
npm run servdev
```
then open http://localhost:8082

## Build
### Build all sources
```
npm run build
```
#### To run the app
open /dist/index.html in a browser

