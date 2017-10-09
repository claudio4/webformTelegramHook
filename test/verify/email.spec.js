const {expect} = require('chai');
const emailVerifier = require('../../src/verify/email');

describe('Email verifier', function() {
  it('Valid email', function(done) {
    let result = emailVerifier("email@test.com");
    console.log(result);
    expect(result).to.equal(true);

    done();
  });
  it('empty email', function(done) {
    let result = emailVerifier("");
    console.log(result);
    expect(result).to.equal(false);

    done();
  });
  it('missing tld', function(done) {
    let result = emailVerifier("email@test");
    console.log(result);
    expect(result).to.equal(false);

    done();
  });
  it('missing domain', function(done) {
    let result = emailVerifier("email@");
    console.log(result);
    expect(result).to.equal(false);

    done();
  });
  it('missing @', function(done) {
    let result = emailVerifier("emailtest.com");
    console.log(result);
    expect(result).to.equal(false);

    done();
  });
  it('missing username', function(done) {
    let result = emailVerifier("@test.com");
    console.log(result);
    expect(result).to.equal(false);

    done();
  });
});
