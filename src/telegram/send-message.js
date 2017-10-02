const request = require('request-promise-native');

const config = require('../../config.js');

const BASEURL = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

module.exports = function(message) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: BASEURL,
      body: JSON.stringify({
        chat_id: config.chatId,
        parse_mode: "HTML",
        text: message
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      response = JSON.parse(response);

      if(response.ok) {
       return resolve(true);
      }
      return reject(false);
    })
    .catch(err => {
      console.error("The telegram API return the following error:", err.response);
      return reject(false);
    })
  })
}
