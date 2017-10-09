const {expect} = require('chai');
const messageVerifier = require('../../src/verify/message');

describe('Message verifier', function() {
  it('Valid message', function(done) {
    let result = messageVerifier("Test message");
    console.log(result);
    expect(result).to.equal(true);

    done();
  });
  it('empty message', function(done) {
    let result = messageVerifier("");
    console.log(result);
    expect(result).to.equal(false);

    done();
  });
});
