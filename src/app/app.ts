import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WledController } from "./components/wled-controller/wled-controller";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WledController],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('HomeControl');
}
