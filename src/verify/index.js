const nameTester  = require('./name'),
  emailTester     = require('./email'),
  messageTester   = require('./message'),
  captchaTester   = require('./captcha');

module.exports = function(name, email, message, recaptchaRequestToken) {
  return new Promise((resolve, reject) => {
    if(!nameTester(name)) {
      return reject("Invalid name");
    }
    if(!emailTester(email)) {
      return reject("Invalid email");
    }
    if(!messageTester(message)) {
      return reject("Invalid message");
    }

    captchaTester(recaptchaRequestToken)
      .then(result => {
        return resolve(result);
      })
      .catch(err => reject(err));
  });
}
