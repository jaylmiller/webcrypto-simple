import * as _aes from './src/aes';
import * as _rsa from './src/rsa';
import * as _utils from './src/utils';

export const aes = {
  encrypt: _aes.encryptAes,
  decrypt: _aes.decryptAes,
  generateKey: _aes.generateAesKey,
  importKey: _aes.importAesKey
}

export const rsa = {
  encrypt: _rsa.encryptRsa,
  decrypt: _rsa.decryptRsa,
  generateKeyPair: _rsa.generateRsaPair,
  importKey: _rsa.importRsa,
  exportKey: _rsa.exportRsa
}

export const utils = {
  ..._utils
}

export default {
  aes,
  rsa,
  utils
}
