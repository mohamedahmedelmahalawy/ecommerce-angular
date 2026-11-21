import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/layout/navbar/navbar';
import { Footer } from './shared/layout/footer/footer';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { FlowbitService } from './shared/services/flowbit/flowbit-service';

@Component({
  imports: [RouterOutlet, Navbar, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  _flowbitService = inject(FlowbitService);

  ngOnInit() {
    this._flowbitService.loadFlowbite(() => {
      console.log('Hi from browser');
      initFlowbite();
    });
    console.log('Hi from both');
  }
}
