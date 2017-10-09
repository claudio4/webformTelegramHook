const {expect} = require('chai');
const nameVerifier = require('../../src/verify/message');

describe('Name verifier', function() {
  it('Valid name', function(done) {
    let result = nameVerifier("Test message");
    console.log(result);
    expect(result).to.equal(true);

    done();
  });
  it('empty name', function(done) {
    let result = nameVerifier("");
    console.log(result);
    expect(result).to.equal(false);

    done();
  });
});
