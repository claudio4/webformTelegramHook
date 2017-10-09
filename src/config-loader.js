if(process.env.NODE_ENV === "test") {
  module.exports = require('../config.example');
} else {
  module.exports = require('../config');
}
