import {utils} from '../index';
import crypto from 'crypto';

it('array buffer to base 64', () => {
  const buf = crypto.pseudoRandomBytes(1234);
  const b64 = utils.arrayBufferToBase64(buf);
  expect(typeof b64).toBe("string");
})