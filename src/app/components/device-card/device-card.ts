import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WledDevice } from '../../types/wled-device';

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './device-card.html',
  styleUrl: './device-card.scss',
})
export class DeviceCardComponent {
  @Input() device!: WledDevice;
  @Input() deviceName?: string;

  @Output() powerToggle = new EventEmitter<WledDevice>();
  @Output() colorChange = new EventEmitter<{ device: WledDevice; color: string }>();
  @Output() advancedOptions = new EventEmitter<WledDevice>();

  onPowerToggle(): void {
    this.powerToggle.emit(this.device);
  }

  onColorChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.colorChange.emit({ device: this.device, color });
  }

  onColorPreview(event: Event): void {
    // This provides live preview feedback while user is selecting color
    // The actual change will be emitted on (change) event
  }

  onAdvancedOptions(): void {
    this.advancedOptions.emit(this.device);
  }

  getDeviceName(): string {
    return this.deviceName || this.device.info.name || this.device.info.ip;
  }

  getDeviceColor(): string {
    if (this.device.state.seg && this.device.state.seg.length > 0) {
      const col = this.device.state.seg[0].col;
      if (col && col.length > 0) {
        const [r, g, b] = col[0];
        return this.rgbToHex(r, g, b);
      }
    }
    return '#ffffff';
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }
}
