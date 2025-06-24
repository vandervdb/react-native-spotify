// src/setup/polyfills.ts

import { install as cryptoInstall } from 'react-native-quick-crypto';
import { Buffer } from '@craftzdog/react-native-buffer';

cryptoInstall();

if (typeof global.Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

global.process = require('process');

if (typeof global.atob === 'undefined') {
  global.atob = (data: string) => Buffer.from(data, 'base64').toString('binary');
}
if (typeof global.btoa === 'undefined') {
  global.btoa = (data: string) => Buffer.from(data, 'binary').toString('base64');
}

global.base64FromArrayBuffer = function (arrayBuffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return global.btoa(binary);
};
