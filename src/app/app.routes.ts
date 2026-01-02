import { Routes } from '@angular/router';
import { WledController } from './components/wled-controller/wled-controller';

export const routes: Routes = [
  { path: '', redirectTo: '/wled', pathMatch: 'full' },
  { path: 'wled', component: WledController },
];
