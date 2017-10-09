const fs = require('fs');
const path = require('path');
const nock = require('nock');
const {expect} = require('chai');
const sendMessage = require('../../src/telegram/send-message');

const responsesDir = path.join(__dirname, "send-message-api-responses");
const BASEURL = 'https://api.telegram.org';
const urlRegex = /\/bot(.+)\/sendMessage/;

const msg = '🔹 <b>Name</b>: name\n🔹 <b>Email</b>: <a href="mailto:email@domain.com">email@domain.com</a>\n\n💬 <b>Message</b>:\ntest message';

function mockupApi(type) {
  response = JSON.parse(fs.readFileSync(path.join(responsesDir, `${type}.json`)));

  return nock(BASEURL)
  .post(urlRegex)
  .reply(response.code, response.body);
}

describe('Telegram Send Message', function() {
  it('Message sent succesfully', function() {
    mockupApi("succesfully");

    return sendMessage(msg)
    .then(function(resp) {
      expect(resp).to.equal(true);
    });
  });
  it('The API return 400 Bad Request error', function() {
    mockupApi("bad-request");

    return new Promise(function(resolve, reject) {
      sendMessage(msg)
      .then(function(resp) {
        reject("The method should have failed");
      })
      .catch(function(err) {
        expect(err).to.equal(false);
        resolve();
      })
    });
  });
});
