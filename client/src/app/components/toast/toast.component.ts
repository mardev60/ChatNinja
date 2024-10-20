import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
    <div class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-300" style="opacity: 1;">
      {{ message }}
    </div>
  `,
  styles: []
})
export class ToastComponent {
  @Input() message: string = '';
}