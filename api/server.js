const jsonServer = require('json-server')
const jsonDb = require('./static_db.json')
const server = jsonServer.create()
const router = jsonServer.router() // for persistance : jsonServer.router('static_db.json')
const middlewares = jsonServer.defaults()
const GLOBAL_PORT = 3001

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/echo', function (req, res) {
  res.jsonp('gg') // res.jsonp(req.query)
})

server.get('/timezones', function (req, res) {
  res.jsonp(jsonDb.timezones)
})

server.get('/users', function (req, res) {
  res.jsonp(jsonDb.users)
})
server.post('/users', function (req, res) {
  res.jsonp({
    id: 99,
    name: req.body.name,
    email: req.body.email,
    timezone: req.body.timezone,
    rights: {
      canCreateWorkspace: req.body.rights.canCreateWorkspace,
      isAdmin: req.body.rights.isAdmin
    }
  })
})
server.get('/users/me', function (req, res) {
  res.jsonp(jsonDb.users_me)
})
server.get('/users/acp', function (req, res) {
  res.jsonp(jsonDb.users_acp)
})
server.get('/users/email/:email_to_test/can_be_used', function (req, res) {
  res.jsonp(jsonDb.users_email_can_be_used)
})

server.get('/workspaces', function (req, res) {
  res.jsonp(jsonDb.workspaces)
})
server.post('/workspaces', function(req, res) {
  res.jsonp({id: 999, name: req.body.name, description: req.body.description})
})
server.get('/workspaces/name/:name_to_test/can_be_used', function (req, res) {
  res.jsonp(jsonDb.workspaces_name_can_be_used)
})
server.get('/workspaces/:workspaces_id/users/roles', function (req, res) {
  res.jsonp(jsonDb['workspaces_' + req.params.workspaces_id + '_users_roles'])
})

server.post('/workspaces/:workspaces_id/users/:user_id/role', function (req, res) {
  res.jsonp({
    user: {
      id: req.params.user_id,
      name: "i dont know, i'm just a mock api"
    },
    workspace: {
      id: req.params.workspaces_id,
      name: "dont blame me, i'm just a mock api"
    },
    role: req.body.role,
    subscribed_to_notif: req.body.subscribed_to_notif
  })
})
server.put('/workspaces/:workspaces_id/users/:user_id/role', function (req, res) {
  res.jsonp({
    user: {
      id: req.params.user_id,
      name: "i dont know, i'm just a mock api"
    },
    workspace: {
      id: req.params.workspaces_id,
      name: "dont blame me, i'm just a mock api"
    },
    role: req.body.role,
    subscribed_to_notif: req.body.subscribed_to_notif
  })
})
server.delete('/workspaces/:workspaces_id/users/:user_id/role', function (req, res) {
  res.jsonp({done: 'ok'})
})


server.use(router)
server.listen(GLOBAL_PORT, function () {
  console.log('JSON Server is running on port : ' + GLOBAL_PORT)
})
