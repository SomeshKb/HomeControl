import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WledDevice, WledInfo } from '../types/wled-device';

@Injectable({
  providedIn: 'root'
})
export class WledHttpService {
  constructor(private http: HttpClient) { }

  setColor(ip: string, r: number, g: number, b: number) {
    const url = `http://${ip}/json/state`;

    const payload = {
      on: true,
      seg: [
        {
          col: [[r, g, b]]
        }
      ]
    };

    return this.http.post(url, payload);
  }

  getDeviceState(ip: string) {
    return this.http.get(`http://${ip}/json/state`);
  }

  getDeviceDetails(ip: string): Observable<WledDevice> {
    return this.http.get<WledDevice>(`http://${ip}/json`);
  }

  turnOff(ip: string) {
    return this.http.post(`http://${ip}/json/state`, { on: false });
  }

  turnOn(ip: string) {
    return this.http.post(`http://${ip}/json/state`, { on: true });
  }

  setEffect(ip: string, fx: number) {
    const url = `http://${ip}/json/state`;

    const payload = {
      seg: [
        {
          fx: fx
        }
      ]
    };

    return this.http.post(url, payload);
  }


  saveDeviceOnSessionStorage(ip: string) {
    console.log('Saving IP to session storage:', ip);
    const existingIp = sessionStorage.getItem('wledDevices');
    if (existingIp) {
      const ipList = existingIp.split(',');
      if (!ipList.includes(ip)) {
        sessionStorage.setItem('wledDevices', `${existingIp},${ip}`);
      }
    } else {
      sessionStorage.setItem('wledDevices', ip);
    }
  }

  deleteDeviceOnSessionStorage(ip: string) {
    const existingIp = sessionStorage.getItem('wledDevices');
    if (existingIp) {
      const ipList = existingIp.split(',').filter(storedIp => storedIp !== ip);
      sessionStorage.setItem('wledDevices', ipList.join(','));
    }
  }

  getSavedDevicesFromSessionStorage(): string[] {
    const existingIp = sessionStorage.getItem('wledDevices');
    return existingIp ? existingIp.split(',') : [];
  }
}
