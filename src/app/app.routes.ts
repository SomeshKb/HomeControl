import { Routes } from '@angular/router';
import { WledController } from './components/wled-controller/wled-controller';
import { WledDeviceDetails } from './components/wled-device-details/wled-device-details';

export const routes: Routes = [
  { path: '', redirectTo: '/wled', pathMatch: 'full' },
  { path: 'wled', component: WledController },
  { path: 'wled-device/:ip', component: WledDeviceDetails }
];
