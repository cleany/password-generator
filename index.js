var argon2 = require('argon2');
var sha256 = require('sha256');
var prompt = require('prompt');

prompt.start();

prompt.get([{
  name: 'password',
  hidden: true,
}, {
  name: 'retype',
  hidden: true,
}], async (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  if (result.password !== result.retype) {
    console.log('passwords don\'t match');
    return;
  }
  const argon2Options = {
    hashLength: 128,
  };
  const sha2 = sha256(result.password);
  console.log('  sha2: ' + sha2);

  const salt = await argon2.generateSalt(32);
  console.log('  salt: ' + salt);

  const hash = await argon2.hash(sha2, salt, argon2Options);
  console.log('  hash: ' + hash);
});
