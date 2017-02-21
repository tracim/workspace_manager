[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Tracim Workspace Manager
Allow to configure all the roles of a Tracim workspace

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
Api will listen to port 3001

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
open /dist/index.html in a web server
