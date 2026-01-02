import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ipv4Validator } from '../../validators/ipv4.validator';

@Component({
  selector: 'app-add-device-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-device-dialog.html',
  styleUrl: './add-device-dialog.scss',
})
export class AddDeviceDialogComponent {
  addDeviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDeviceDialogComponent>
  ) {
    this.addDeviceForm = this.fb.group({
      deviceName: [''],
      ipAddress: ['', [Validators.required, ipv4Validator()]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAddDevice(): void {
    if (this.addDeviceForm.valid) {
      const formValue = {
        deviceName: this.addDeviceForm.get('deviceName')?.value || '',
        ipAddress: this.addDeviceForm.get('ipAddress')?.value,
      };
      this.dialogRef.close(formValue);
    }
  }

  get ipAddressError(): string {
    const control = this.addDeviceForm.get('ipAddress');
    if (control?.hasError('required')) {
      return 'IP Address is required';
    }
    if (control?.hasError('invalidIpv4')) {
      return 'Please enter a valid IPv4 address (e.g., 192.168.1.50)';
    }
    return '';
  }
}
