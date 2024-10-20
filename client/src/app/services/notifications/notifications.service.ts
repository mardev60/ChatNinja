import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastComponent } from '../../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  success(message: string, viewContainerRef: ViewContainerRef) {
    const toastComponent = viewContainerRef.createComponent(ToastComponent);
    
    toastComponent.instance.message = message;

    setTimeout(() => {
      toastComponent.destroy();
    }, 3000);
  }
}