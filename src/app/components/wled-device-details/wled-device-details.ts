import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WledHttpService } from '../../services/wled-http-service';
import { WledDevice } from '../../types/wled-device';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-wled-device-details',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
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

  getDeviceColor(): string {
    try {
      const col = this.deviceDetails?.state?.seg?.[0]?.col?.[0];
      if (!col || col.length < 3) return '#ffffff';
      const [r, g, b] = col;
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    } catch {
      return '#ffffff';
    }
  }

  onColorChange(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    const { r, g, b } = this.hexToRgb(color);
    if (!this.deviceDetails) return;
    this.wledService.setColor(this.ip, r, g, b).subscribe({
      next: () => {
        if (this.deviceDetails?.state?.seg && this.deviceDetails.state.seg.length > 0) {
          this.deviceDetails.state.seg[0].col = [[r, g, b]];
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Failed to set color:', err)
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
    if (!this.deviceDetails) return;
    this.wledService.turnOn(this.ip).subscribe({
      next: () => {
        if (this.deviceDetails) {
          this.deviceDetails.state.on = true;
          this.cdr.detectChanges();
        }
      },
      error: () => {
        if (this.deviceDetails) {
          this.deviceDetails.state.on = false;
          this.cdr.detectChanges();
        }
      }
    });
  }
  turnOff() {
    if (!this.deviceDetails) return;
    this.wledService.turnOff(this.ip).subscribe({
      next: () => {
        if (this.deviceDetails) {
          this.deviceDetails.state.on = false;
          this.cdr.detectChanges();
        }
      },
      error: () => {
        if (this.deviceDetails) {
          this.deviceDetails.state.on = true;
          this.cdr.detectChanges();
        }
      }
    });
  }
}

