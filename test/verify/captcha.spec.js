const fs = require('fs');
const path = require('path');
const nock = require('nock');
const {expect} = require('chai');
const captcha = require('../../src/verify/captcha');

const responsesDir = path.join(__dirname, "captcha-api-responses");
const BASEURL = "https://www.google.com";

function mockupApi(type) {
  response = JSON.parse(fs.readFileSync(path.join(responsesDir, `${type}.json`)));

  return nock(BASEURL)
  .post("/recaptcha/api/siteverify")
  .reply(response.code, response.body);
}

describe('Captcha Verifier', function() {
  it('Success', function() {
    mockupApi('success');
    return captcha("TEST");
  });
  it('invalid-input-response', function() {
    mockupApi('invalid-input-response');
    return new Promise(function(resolve, reject) {
      return captcha("TEST")
      .then(function(resp) {
        reject("The method should have failed");
      })
      .catch(function(err) {
        try {
          expect(err).to.equal("Bad recaptcha request token");
        }catch(e) {
          reject(e);
        }
        resolve();
      })
    });
  });
  it('missing-input-response', function() {
    mockupApi('missing-input-response');
    return new Promise(function(resolve, reject) {
      return captcha("TEST")
      .then(function(resp) {
        reject("The method should have failed");
      })
      .catch(function(err) {
        try {
          expect(err).to.equal("Missing recaptcha request token");
        }catch(e) {
          reject(e);
        }
        resolve();
      })
    });
  });
  it('timeout-or-duplicate', function() {
    mockupApi('timeout-or-duplicate');
    return new Promise(function(resolve, reject) {
      return captcha("TEST")
      .then(function(resp) {
        reject("The method should have failed");
      })
      .catch(function(err) {
        try {
          expect(err).to.equal("Expired or duplicated recaptcha request token");
        }catch(e) {
          reject(e);
        }
        resolve();
      })
    });
  });
  it('Unknown error code', function() {
    mockupApi('unknown-error-code');
    return new Promise(function(resolve, reject) {
      return captcha("TEST")
      .then(function(resp) {
        reject("The method should have failed");
      })
      .catch(function(err) {
        try {
          expect(err).to.equal("Error while processing the request");
        }catch(e) {
          reject(e);
        }
        resolve();
      })
    });
  });
  it('Error 400 Bad Request', function() {
    mockupApi('error-400-bad-request');
    return new Promise(function(resolve, reject) {
      return captcha("TEST")
      .then(function(resp) {
        reject("The method should have failed");
      })
      .catch(function(err) {
        try {
          expect(err).to.equal("Error while connecting with Google recaptcha");
        }catch(e) {
          reject(e);
        }
        resolve();
      })
    });
  });
});
