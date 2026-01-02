import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WledDevice, WledInfo, StoredWledDevice } from '../types/wled-device';

@Injectable({
  providedIn: 'root'
})
export class WledHttpService {
  private readonly COOKIE_NAME = 'wledDevices';
  private readonly COOKIE_EXPIRY_DAYS = 365;

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
    const existingDevices = this.getSavedDevicesFromSessionStorage();

    const deviceExists = existingDevices.some(d => d.ip === ip);
    if (!deviceExists) {
      existingDevices.push({ ip, deviceName: deviceName || '' });
      this.setCookie(JSON.stringify(existingDevices));
    }
  }

  deleteDeviceOnSessionStorage(ip: string) {
    const existingDevices = this.getSavedDevicesFromSessionStorage();
    const filtered = existingDevices.filter(d => d.ip !== ip);
    this.setCookie(JSON.stringify(filtered));
  }

  getSavedDevicesFromSessionStorage(): StoredWledDevice[] {
    const cookieData = this.getCookie(this.COOKIE_NAME);
    if (!cookieData) {
      return [];
    }

    try {
      return JSON.parse(cookieData);
    } catch {
      const ipList = cookieData.split(',');
      return ipList.map(ip => ({ ip: ip.trim(), deviceName: '' }));
    }
  }

  private setCookie(value: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (this.COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `${this.COOKIE_NAME}=${encodeURIComponent(value)};${expires};path=/`;
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  }
}
