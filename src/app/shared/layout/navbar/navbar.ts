import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { FlowbitService } from '../../services/flowbit/flowbit-service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  _flowbitService = inject(FlowbitService);

  ngOnInit() {
    this._flowbitService.loadFlowbite(() => {
      console.log('Hi from browser');
      initFlowbite();
    });
    console.log('Hi from both');
  }
}
