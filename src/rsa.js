export function importRsa(rsaJwk, isPrivate) {
  return window.crypto.subtle.importKey(
      "jwk",
      rsaJwk, { //these are the algorithm options
        name: "RSA-OAEP",
        hash: {
          name: "SHA-256"
        }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      [(isPrivate ? "decrypt" : "encrypt")]
    )
    .then(function (key) {
      return key;
    })
    .catch(function (err) {
      return err;
    });
}

export function exportRsa(key) {
  return window.crypto.subtle.exportKey(
      "jwk",
      key
    )
    .then(function (jwk) {
      //returns the exported key data
      return jwk;
    })
    .catch(function (err) {
      return err;
    });
}

export function generateRsaPair() {
  return window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 2048, //can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {
          name: "SHA-256"
        }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"]
    )
    .then(function (key) {
      //returns a keypair object
      return {
        publicKey: key.publicKey,
        privateKey: key.privateKey
      };
    })
    .catch(function (err) {
      return err;
    });
}

export function encryptRsa(buffer, publicKey) {
  return window.crypto.subtle.encrypt({
        name: "RSA-OAEP",
        //label: Uint8Array([...]) //optional
      },
      publicKey,
      buffer //ArrayBuffer of data you want to encrypt
    )
    .then(function (encrypted) {
      //returns an ArrayBuffer containing the encrypted data
      return new Uint8Array(encrypted);
    })
    .catch(function (err) {
      return err;
    });
}

export function decryptRsa(buffer, privateKey) {
  return window.crypto.subtle.decrypt({
        name: "RSA-OAEP",
        //label: Uint8Array([...]) //optional
      },
      privateKey, 
      buffer
    )
    .then(function (decrypted) {
      //returns an ArrayBuffer containing the encrypted data
      return new Uint8Array(decrypted);
    })
    .catch(function (err) {
      return err;
    });
}
