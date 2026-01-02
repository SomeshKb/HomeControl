import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WledHttpService } from '../../services/wled-http-service';
import { CommonModule } from '@angular/common';
import { WledDevice, StoredWledDevice } from '../../types/wled-device';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AddDeviceDialogComponent } from '../add-device-dialog/add-device-dialog';
import { DeviceCardComponent } from '../device-card/device-card';

interface DeviceWithName {
  device: WledDevice;
  deviceName?: string;
}

@Component({
  selector: 'app-wled-controller',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    DeviceCardComponent,
  ],
  templateUrl: './wled-controller.html',
  styleUrl: './wled-controller.scss',
})
export class WledController implements AfterViewInit {
  devicesWithNames: DeviceWithName[] = [];
  universalColor: string = '#ffffff';

  constructor(
    private wledService: WledHttpService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.getExistingDevices();
  }

  openAddDeviceDialog(): void {
    const dialogRef = this.dialog.open(AddDeviceDialogComponent, {
      width: '400px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.wledService.saveDeviceOnSessionStorage(result.ipAddress, result.deviceName);
        this.getExistingDevices();
      }
    });
  }

  getExistingDevices(): void {
    const savedDevices = this.wledService.getSavedDevicesFromSessionStorage();
    this.devicesWithNames = [];

    for (const storedDevice of savedDevices) {
      this.wledService.getDeviceDetails(storedDevice.ip).subscribe({
        next: (deviceDetails: WledDevice) => {
          console.log('Found device:', deviceDetails);
          this.devicesWithNames.push({
            device: deviceDetails,
            deviceName: storedDevice.deviceName,
          });
          this.cdr.detectChanges();
        },
        error: () => {
          console.warn(`Device at IP ${storedDevice.ip} is not reachable.`);
        },
      });
    }
  }

  onDevicePowerToggle(device: WledDevice): void {
    if (device.state.on) {
      this.turnOff(device);
    } else {
      this.turnOn(device);
    }
  }

  onDeviceColorChange(data: { device: WledDevice; color: string }): void {
    const { device, color } = data;
    const { r, g, b } = this.hexToRgb(color);
    this.wledService.setColor(device.info.ip, r, g, b).subscribe({
      next: () => {
        // Update the local state
        if (device.state.seg && device.state.seg.length > 0) {
          device.state.seg[0].col = [[r, g, b]];
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Failed to set color:', err);
      },
    });
  }

  onDeviceAdvancedOptions(device: WledDevice): void {
    console.log('Opening advanced options for device:', device.info.ip);
    this.router.navigate(['/wled-device', device.info.ip]);
  }

  turnOnAll(): void {
    for (const { device } of this.devicesWithNames) {
      this.turnOn(device);
    }
  }

  turnOffAll(): void {
    for (const { device } of this.devicesWithNames) {
      this.turnOff(device);
    }
  }

  setColorAll(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.universalColor = color;
    const { r, g, b } = this.hexToRgb(color);
    for (const { device } of this.devicesWithNames) {
      this.wledService.setColor(device.info.ip, r, g, b).subscribe({
        next: () => {
          if (device.state.seg && device.state.seg.length > 0) {
            device.state.seg[0].col = [[r, g, b]];
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.error('Failed to set color on all devices:', err);
        },
      });
    }
  }

  onUniversalColorPreview(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.universalColor = color;
  }

  private turnOff(device: WledDevice): void {
    this.wledService.turnOff(device.info.ip).subscribe({
      next: () => {
        device.state.on = false;
        this.cdr.detectChanges();
      },
      error: () => {
        device.state.on = true;
        this.cdr.detectChanges();
      },
    });
  }

  private turnOn(device: WledDevice): void {
    this.wledService.turnOn(device.info.ip).subscribe({
      next: () => {
        device.state.on = true;
        this.cdr.detectChanges();
      },
      error: () => {
        device.state.on = false;
        this.cdr.detectChanges();
      },
    });
  }

  private hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }
}
