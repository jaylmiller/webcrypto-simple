export function importAesKey(raw) {
  return window.crypto.subtle.importKey(
      "raw", //can be "jwk" or "raw"
      raw, { //this is the algorithm options
        name: "AES-CBC",
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
    .then(function (key) {
      //returns the symmetric key
      return key;
    })
}

export function encryptAes(buffer, aesKey, iv) {
  return window.crypto.subtle.encrypt({
        name: "AES-CBC",
        iv: iv ? iv : (new Uint8Array(16)), //if no IV given, its a 0 vector
      },
      aesKey, 
      buffer //ArrayBuffer of data you want to encrypt
    )
    .then(function (encrypted) {
      //returns an ArrayBuffer containing the encrypted data
      return new Uint8Array(encrypted);     
    })
}

export function decryptAes(buffer, aesKey, iv) {
  return window.crypto.subtle.decrypt({
        name: "AES-CBC",
        iv: iv ? iv : (new Uint8Array(16)), //if no IV given, its a 0 vector
      },
      aesKey, //from generateKey or importKey above
      buffer //ArrayBuffer of the data
    )
    .then(function (decrypted) {
      //returns an ArrayBuffer containing the decrypted data
      return new Uint8Array(decrypted);
    })
}

export function generateAesKey() {
  return window.crypto.subtle.generateKey({
        name: "AES-CBC",
        length: 256, //can be  128, 192, or 256
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    )
    .then(function (key) {
      //returns a key object
      return key;
    })
}

// export function exportAes(aes) {
//   return window.crypto.subtle.exportKey(
//       "raw", //can be "jwk" or "raw"
//       aes //extractable must be true
//     )
//     .then(function (keydata) {
//       //returns the exported key data
//       return keydata;
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }
