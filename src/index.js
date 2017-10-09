const express   = require('express'),
  bodyParser    = require('body-parser');

const telegram  = require('./telegram');
const verify    = require('./verify');
const config    = require('./config-loader');

const app = new express();
const jsonParser = bodyParser.json();

if(config.cors.enabled) {
  const cors = require('cors');
  app.use(cors(cors.options))
}

app.get("/", (req,res) => {
    res.status(400).send("Sorry, this page only accepts POST requests");
});

app.post("/", jsonParser, (req, res) => {
  verify(req.body.name, req.body.email, req.body.message, req.body["g-recaptcha-response"])
  .then(result => {
    telegram.sendMessage(
      telegram.formatMessage(
        req.body.name,
        req.body.email,
        req.body.message
      )
    )
    .then(result => {
      res.status(200).send("Message was sent successfully.")
    })
    .catch(err => {
      res.status(500).send("Error while sending the message.")
    })
  })
  .catch(err => {
    if(err === "Error while processing the request" || err === "Error while connecting with Google recaptcha") {
      res.status(500).send(err)
    } else {
      res.status(400).send(err)
    }
  })
})

app.listen(config.port, () => {
  console.log("The server is listen in port: " + config.port);
});
