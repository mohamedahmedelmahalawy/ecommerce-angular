import { afterNextRender, afterRenderEffect, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  constructor() {
    // if (typeof window != 'undefined' && window.document) {
    //   console.log(document.title);
    // }

    // afterRenderEffect(() => {
    //   console.log(document.title);
    // });

    afterNextRender(() => {});
  }
}
