export function hexStringToArrayBuffer(hexString) {
  return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

export function arrayBufferToHexString(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}


export function base64toArrayBuffer(base64) {
  const raw = window.atob(base64);
  const rawLength = raw.length;
  let array = new Uint8Array(new ArrayBuffer(rawLength));
  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

export function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}


export function fileToBuffer(file) {
  return fetch(file.preview)
    .then(response => response.arrayBuffer())
    .then(a => a);
}

export function arrayBufferToString(uintArray) {
  //return String.fromCharCode(String, uintArray);
  return new TextDecoder().decode(uintArray);
}
