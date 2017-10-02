const request = require('request-promise-native');

const config = require('../../config.js');

const BASEURL = "https://www.google.com/recaptcha/api/siteverify";

module.exports = function(requestToken) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: BASEURL,
      formData: {
        secret: config.reCaptchaSecretKey,
        response: requestToken
      }
    })
    .then(response => {
      response = JSON.parse(response);

      if(response.success) {
        return resolve(true);
      }

      if(response["error-codes"].includes("invalid-input-response")) {
        return reject("Bad recaptcha request token")
      } else if(response["error-codes"].includes("missing-input-response")) {
        return reject("Missing recaptcha request token")
      } else if(response["error-codes"].includes("timeout-or-duplicate")) {
        return reject("Expired or duplicated recaptcha request token")
      } else {
        console.error("Google recaptcha return the following error codes: ", response["error-codes"]);
        return reject("Error while processing the request")
      }
    })
    .catch(err => {
      console.error("Error with a request to Google recaptcha", err);
      return reject("Error while connecting with Google recaptcha");
    })
  })
}
