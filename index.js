const express   = require('express'),
  reCAPTCHA     = require('recaptcha2'),
  https         = require('https'),
  bodyParser    = require('body-parser'),
  config        = require('./config.js');
const app = new express();
const jsonParser = bodyParser.json();

var recaptcha=new reCAPTCHA({
  secretKey: config.reCaptchaSecretKey
})

app.get("/", (req,res) => {
    res.status(403).send("Sorry, this page only allows POST requests");
});

app.post("/", jsonParser, async (req, res) => {
  if( !(await validateForm(req)) ) {
    return res.status(400).send();
  }

  try {
    sendTelegramMessage(req.body.name, req.body.email, req.body.message)
  } catch(err) {
    return res.status(503).send();
  }

  return res.status(200).send();
});

app.listen(config.port, () => {
  console.log("The server is listen in port: " + config.port);
});

async function validateForm(req) {
  if( !(req.body.name && req.body.email && req.body.message) ) {
    return false
  }

  if(!req.body.email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
    return false
  }

  var isValid;
  await recaptcha.validateRequest(req)
  .then(function(){
    isValid = true
  })
  .catch(function(errorCodes){
    isValid = false
  });
  return isValid;
}
function sendTelegramMessage(name, email, message) {
  var post_data = JSON.stringify({
    chat_id: config.chatId,
    parse_mode: "HTML",
    text: `🔹 <b>Name</b>: ${name}\n🔹 <b>Email</b>: <a href="mailto:${email}">${email}</a>\n\n💬 <b>Message</b>:\n${message}`
  });
  var post_options = {
    host: "api.telegram.org" ,
    port: 443,
    path: "/bot" + config.botToken + "/sendMessage",
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(post_data)
    }
  };
  https.request(post_options).end(post_data);
}
