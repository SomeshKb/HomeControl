import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WledHttpService } from '../../services/wled-http-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WledDevice } from '../../types/wled-device';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wled-controller',
  imports: [CommonModule, FormsModule],
  templateUrl: './wled-controller.html',
  styleUrl: './wled-controller.scss',
})
export class WledController implements AfterViewInit {

  devices: WledDevice[] = [];
  newIp = '';

  constructor(
    private wledService: WledHttpService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.getExistingDevices();
  }

  getExistingDevices() {
    const savedIps = this.wledService.getSavedDevicesFromSessionStorage();
    this.devices = [];

    for (const ip of savedIps) {
      this.wledService.getDeviceDetails(ip).subscribe({
        next: (deviceDetails: WledDevice) => {
          console.log('Found device:', deviceDetails);
          this.devices.push(deviceDetails);
          this.cdr.detectChanges();
        },
        error: () => {
          console.warn(`Device at IP ${ip} is not reachable.`);
        }
      });
    }
  }

  addDevice() {
    if (this.newIp) {
      this.wledService.saveDeviceOnSessionStorage(this.newIp);
      this.newIp = '';
      this.getExistingDevices();
    }
  }

  onColorChange(device: WledDevice, event: Event) {
    const color = (event.target as HTMLInputElement).value;
    const { r, g, b } = this.hexToRgb(color);
    this.wledService.setColor(device.info.ip, r, g, b).subscribe();
  }

  turnOff(device: WledDevice) {
    this.wledService.turnOff(device.info.ip).subscribe({
      next: () => {
        device.state.on = false;
        this.cdr.detectChanges();
      },
      error: () => {
        device.state.on = true;
        this.cdr.detectChanges();
      }
    });
  }

  turnOn(device: WledDevice) {
    this.wledService.turnOn(device.info.ip).subscribe({
      next: () => {
        device.state.on = true;
        this.cdr.detectChanges();
      },
      error: () => {
        device.state.on = false;
        this.cdr.detectChanges();
      }
    });
  }

  private hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  getDeviceColor(device: WledDevice): string {
    if (device.state.seg && device.state.seg.length > 0) {
      const col = device.state.seg[0].col;
      if (col && col.length > 0) {
        const [r, g, b] = col[0];
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      }
    }
    return "";
  }

  turnOnAll(){
    this.devices.forEach(device => this.turnOn(device));
  }
  turnOffAll() {
    this.devices.forEach(device => this.turnOff(device));
  }

  onAllColorChange(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    const { r, g, b } = this.hexToRgb(color);
    this.devices.forEach(device => {
      this.wledService.setColor(device.info.ip, r, g, b).subscribe();
    });

    this.getExistingDevices();
  }

  openAdvanceOption(device: WledDevice) {
    this.router.navigateByUrl(`/wled-device/${device.info.ip}`);
  }
}
