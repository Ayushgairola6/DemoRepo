import * as openpgp from "openpgp";

export const encryptPassword = async (password) => {
  const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
YOUR PUBLIC KEY HERE
-----END PGP PUBLIC KEY BLOCK-----`;

  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: password }),
    encryptionKeys: publicKey,
  });

  return encrypted;
};
