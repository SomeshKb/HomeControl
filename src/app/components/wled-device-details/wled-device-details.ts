import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WledHttpService } from '../../services/wled-http-service';
import { WledDevice } from '../../types/wled-device';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wled-device-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './wled-device-details.html',
  styleUrl: './wled-device-details.scss',
})
export class WledDeviceDetails implements AfterViewInit {

  ip: string = '';
  deviceDetails: WledDevice | null = null;
  effects: string[] = [];

  constructor(private route: ActivatedRoute, private wledService: WledHttpService, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ip = params.get('ip') || '';
      this.getDeviceDetails();
    });

  }

  getDeviceDetails() {
    this.wledService.getDeviceDetails(this.ip).subscribe({
      next: (deviceDetails) => {
        console.log('Device Details:', deviceDetails);
        this.deviceDetails = deviceDetails;
        this.effects = deviceDetails.effects || [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching device details:', error);
      }
    });
  }

  applyEffect(index: number) {
    if (!this.deviceDetails) return;
    this.wledService.setEffect(this.ip, index).subscribe({
      next: () => {
        console.log('Applied effect', index);
        // refresh device details to reflect change
        this.getDeviceDetails();
      },
      error: (err) => console.error('Error applying effect', err)
    });
  }

  formatUptime(uptimeSeconds: number | undefined): string {
    if (!uptimeSeconds) return '—';
    const s = Number(uptimeSeconds);
    const days = Math.floor(s / 86400);
    const hrs = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const parts = [] as string[];
    if (days) parts.push(`${days}d`);
    if (hrs) parts.push(`${hrs}h`);
    if (mins) parts.push(`${mins}m`);
    if (parts.length === 0) return `${s}s`;
    return parts.join(' ');
  }

  turnOn() {

  }
  turnOff() {

  }
}
