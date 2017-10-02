module.exports = {
  port: 3000,
  cors: {
    enabled: false,
    // Check the avalible options at https://www.npmjs.com/package/cors#configuration-options.
    options: {
      origin: "http://example.com"
    }
  },
  reCaptchaSecretKey: '',
  botToken: '',
  chatId: ''
}
