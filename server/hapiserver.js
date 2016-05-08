'use strict';

const path = require('path')
const Hapi = require('hapi')
const Good = require('good')

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, '../public')
      }
    }
  }
})

server.connection({port:3456})

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply("Hello back")
  }
})

server.route({
  method:'GET',
  path: '/hi/{name}',
  handler: (request, reply) => {
    reply('Hello ' + encodeURIComponent(request.params.name) + '!')
  }
})

const rootHandler = (request, reply) => {
  reply.view('index', {
    title: 'templates/views/jade/index.js | Hapi ' + request.server.version,
    message: 'Index - Hello World.'
  })
}
server.route({
  method:'GET',
  path: '/index',
  handler: rootHandler
})


server.register(
    [{
      register: Good,
      options: {
        reporters: [{
          reporter: require('good-console'),
          events: {
            response: '*',
            log: '*'
          }
        }]
      }
    },
    {
      register: require('inert'),
      options: {}
    },
    {
      register: require('vision'),
      options: {}
    }], err => {

    if (err) {
      throw err;
    }
    server.views ({
      engines: { jade : require('jade')},
      path: path.join(__dirname, 'templates'),
      compileOptions: {
        pretty: true
      }
    })
})


server.route( {
  method:'GET',
  path:'/css/{param*}',
  handler: {
    directory: {
      path: './css',
      redirectToSlash: true,
      index: true
    }
  }
})

server.route( {
  method:'GET',
  path:'/js/{param*}',
  handler: {
    directory: {
      path: './js',
      redirectToSlash: true,
      index: true
    }
  }
})

server.route( {
  method:'GET',
  path:'/static/css/{param*}',
  handler: {
    directory: {
      path: './css',
      redirectToSlash: true,
      index: true
    }
  }
})
server.route( {
  method:'GET',
  path:'/static/js/{param*}',
  handler: {
    directory: {
      path: './js',
      redirectToSlash: true,
      index: true
    }
  }
})

server.route( {
  method:'GET',
  path: '/',
  handler: (request, reply) => {
    reply.file('index.html')
  }
})

process.on('uncaughtException', evt => {
  console.log( 'uncaughtException: ', evt );
})

server.start(err => {
  if (err) {
    throw err
  }
  console.log("server running at: ", server.info.uri , ' from ', __dirname)
})
