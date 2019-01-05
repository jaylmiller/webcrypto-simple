// inject an isomorphic copy of the WebCrypto API into the testing environment
import {generateAesKey, encryptAes, decryptAes} from '../src/aes';
import WebCrypto from 'isomorphic-webcrypto';
import crypto from 'crypto';
Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: WebCrypto.subtle
  }
});

it('generates key', () => {
  generateAesKey().then(k => {
    expect(k.type).toBe("secret");
  });
})

it('encrypt/decrypt bytes works with default IV', async () => {
  const k = await generateAesKey();
  const plain = crypto.pseudoRandomBytes(1234);
  const c = await encryptAes(plain, k);
  expect(c.length).toBe((Math.floor(1234/16)+1)*16);
  const p = await decryptAes(c, k);
  expect(p).toEqual(new Uint8Array(plain));
})

it('encrypt/decrypt bytes works with provided IV', async () => {
  const k = await generateAesKey();
  const plain = crypto.pseudoRandomBytes(18);
  const iv = crypto.pseudoRandomBytes(16);
  const c = await encryptAes(plain, k, iv);
  const p = await decryptAes(c, k, iv);
  expect(p).toEqual(new Uint8Array(plain));
})

it('encrypt/decrypt base64', async () => {
  const k = await generateAesKey();
  const plain = crypto.pseudoRandomBytes(1234);
  const c = await encryptAes(plain, k);
  expect(c.length).toBe((Math.floor(1234/16)+1)*16);
  const p = await decryptAes(c, k);
  expect(p).toEqual(new Uint8Array(plain));
})

it('invalid cyphertext throws exception', async () => {
  const k = await generateAesKey();
  const cipher = crypto.pseudoRandomBytes(1234);
  decryptAes(cipher, k).then(p => {
    expect(false).toBe(true);
  }).catch(e => {
    expect(true).toBe(true);
  })
})