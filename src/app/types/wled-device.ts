/**
 * WLED Device Information and State Types
 * Represents the complete state and information structure returned by a WLED device
 */

// Device Info Interfaces
export interface WledLeds {
  count: number;
  pwr: number;
  fps: number;
  maxpwr: number;
  maxseg: number;
  bootps: number;
  seglc: number[];
  lc: number;
  rgbw: boolean;
  wv: number;
  cct: number;
}

export interface WledWifi {
  bssid: string;
  rssi: number;
  signal: number;
  channel: number;
  ap: boolean;
}

export interface WledFilesystem {
  u: number;
  t: number;
  pmt: number;
}

export interface WledMap {
  id: number;
}

export interface WledInfo {
  ver: string;
  vid: number;
  cn: string;
  release: string;
  repo: string;
  deviceId: string;
  leds: WledLeds;
  str: boolean;
  name: string;
  udpport: number;
  simplifiedui: boolean;
  live: boolean;
  liveseg: number;
  lm: string;
  lip: string;
  ws: number;
  fxcount: number;
  palcount: number;
  cpalcount: number;
  maps: WledMap[];
  wifi: WledWifi;
  fs: WledFilesystem;
  ndc: number;
  arch: string;
  core: string;
  clock: number;
  flash: number;
  lwip: number;
  bootloaderSHA256: string;
  freeheap: number;
  uptime: number;
  time: string;
  u: Record<string, string[]>;
  opt: number;
  brand: string;
  product: string;
  mac: string;
  ip: string;
}

// State Interfaces
export interface WledAudioReactive {
  on: boolean;
}

export interface WledNightLight {
  on: boolean;
  dur: number;
  mode: number;
  tbri: number;
  rem: number;
}

export interface WledUdpn {
  send: boolean;
  recv: boolean;
  sgrp: number;
  rgrp: number;
}

export interface WledSegment {
  id: number;
  start: number;
  stop: number;
  len: number;
  grp: number;
  spc: number;
  of: number;
  on: boolean;
  frz: boolean;
  bri: number;
  cct: number;
  set: number;
  col: number[][];
  fx: number;
  sx: number;
  ix: number;
  pal: number;
  c1: number;
  c2: number;
  c3: number;
  sel: boolean;
  rev: boolean;
  mi: boolean;
  o1: boolean;
  o2: boolean;
  o3: boolean;
  si: number;
  m12: number;
}

export interface WledState {
  on: boolean;
  bri: number;
  transition: number;
  ps: number;
  pl: number;
  ledmap: number;
  AudioReactive: WledAudioReactive;
  nl: WledNightLight;
  udpn: WledUdpn;
  lor: number;
  mainseg: number;
  seg: WledSegment[];
}

// Full Response
export interface WledDevice {
  state: WledState;
  info: WledInfo;
  effects: string[];
  palettes: string[];
}
