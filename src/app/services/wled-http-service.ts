import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WledDevice, WledInfo, StoredWledDevice } from '../types/wled-device';

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


  saveDeviceOnSessionStorage(ip: string, deviceName?: string) {
    console.log('Saving device to session storage:', { ip, deviceName });
    const existingDevices = this.getSavedDevicesFromSessionStorage();

    const deviceExists = existingDevices.some(d => d.ip === ip);
    if (!deviceExists) {
      existingDevices.push({ ip, deviceName: deviceName || '' });
      sessionStorage.setItem('wledDevices', JSON.stringify(existingDevices));
    }
  }

  deleteDeviceOnSessionStorage(ip: string) {
    const existingDevices = this.getSavedDevicesFromSessionStorage();
    const filtered = existingDevices.filter(d => d.ip !== ip);
    sessionStorage.setItem('wledDevices', JSON.stringify(filtered));
  }

  getSavedDevicesFromSessionStorage(): StoredWledDevice[] {
    const existingData = sessionStorage.getItem('wledDevices');
    if (!existingData) {
      return [];
    }

    try {
      return JSON.parse(existingData);
    } catch {
      // Fallback for old comma-separated format
      const ipList = existingData.split(',');
      return ipList.map(ip => ({ ip: ip.trim(), deviceName: '' }));
    }
  }
}
