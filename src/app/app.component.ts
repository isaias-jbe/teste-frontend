import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="container">
      <app-address></app-address>
    </div>
  `
})
export class AppComponent {}
