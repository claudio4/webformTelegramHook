module.exports = function(name, email, message) {
  return `🔹 <b>Name</b>: ${name}
🔹 <b>Email</b>: <a href="mailto:${email}">${email}</a>

💬 <b>Message</b>:
${message}`
}
