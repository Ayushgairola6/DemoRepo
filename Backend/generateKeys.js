const { generateKeyPair } = require('crypto');
const fs = require('fs');

generateKeyPair('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
}, (err, publicKey, privateKey) => {
  if (err) {
    console.error('Error generating keys:', err);
  } else {
    fs.writeFileSync('private.key', privateKey);
    fs.writeFileSync('cert.pem', publicKey);
    console.log('Private key and certificate generated successfully!');
  }
});
