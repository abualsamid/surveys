if (process.env.NODE_ENV === 'development') {
  module.exports = require('./configureSettings.dev')
} else {
  module.exports = require('./configureSettings.prod')
}
