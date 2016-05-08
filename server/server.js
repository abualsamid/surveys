
import express from 'express';
import path from 'path';

import React from 'react'
import { renderToString } from 'react-dom/server'

import { Router, RouterContext, match } from 'react-router'

import routes from '../common/routes'
import { Provider } from 'react-redux'

import fetchComponentData from '../common/utils/fetchComponentData'

const app = express()

// initialize webpack HMR
if ( process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')

  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.config')
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler,
    {
      noInfo: true,
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }

   }))
  app.use(webpackHotMiddleware(compiler))
}


import configureStore from '../common/store/configureStore'



const port = process.env.PORT || 3456;


// app.set('view engine','pug')
// app.set('views', './public')

// server rendering
app.use( ( req, res, next ) => {


  const store = configureStore()


	// react-router
	match( {routes, location: req.url}, ( error, redirectLocation, renderProps ) => {
		if ( error )
			return res.status(500).send( error.message );
		if ( redirectLocation )
			return res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
		if ( renderProps == null ) {
			// return next('err msg: route not found'); // yield control to next middleware to handle the request
			return res.status(404).send( 'Not found' );
		}

		// console.log( '\nserver > renderProps: \n', require('util').inspect( renderProps, false, 1, true) )
		// console.log( '\nserver > renderProps: \n', require('util').inspect( renderProps.components, false, 3, true) )

		// this is where universal rendering happens,
		// fetchComponentData() will trigger actions listed in static "needs" props in each container component
		// and wait for all of them to complete before continuing rendering the page,
		// hence ensuring all data needed was fetched before proceeding
		//
		// renderProps: contains all necessary data, e.g: routes, router, history, components...
		fetchComponentData( store.dispatch, renderProps.components, renderProps.params)

		.then( () => {


			const initView = renderToString((
				<Provider store={store}>
          <RouterContext {...renderProps} onUpdate={() => window.scrollTo(0, 0)} />
				</Provider>
			))


			// console.log('\ninitView:\n', initView);

			let state = JSON.stringify( store.getState() );
			// console.log( '\nstate: ', state )

			let page = renderFullPage( initView, state )

			// console.log( '\npage:\n', page );

			return page;

		})
		.then( page => res.status(200).send(page) )
		.catch( err => res.end(err.message) );
	})
})

function renderFullPage(html, initialState) {
  return `
  <!DOCTYPE html>
  <html lang="en" itemscope itemtype="http://schema.org/Article">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta http-equiv="cache-control" content="max-age=21600" />
    <title>surveys</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,400italic,700,900,100,300,700italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <br/>
    <section id="root" class="container" >${html}</section>
    <script>window.$REDUX_STATE = ${initialState}</script>
    <script src="/js/bundle.js"></script>
  </body>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  </html>

	`
}

// app.use(express.static(__dirname + '/public'));
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })


// example of handling 404 pages
app.get('*', function(req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
})

// global error catcher, need four arguments
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log( 'uncaughtException: ', evt );
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
