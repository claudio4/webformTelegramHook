const {expect} = require('chai');
const formatMessage = require('../../src/telegram/format-message');

describe('Format Message', function() {
  it('Return formated message', function(done) {
    let msg = formatMessage("name", "email@domain.com", "test message");
    expect(msg).to.equal('🔹 <b>Name</b>: name\n🔹 <b>Email</b>: <a href="mailto:email@domain.com">email@domain.com</a>\n\n💬 <b>Message</b>:\ntest message');

    done();
  });
});
