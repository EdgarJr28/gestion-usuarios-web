import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string = 'Éxito') {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-right',  // Cambiar posición
      timeOut: 3000,  // Duración (en ms)
      closeButton: true,
      progressBar: true,
      tapToDismiss: true,
    });
  }
  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      tapToDismiss: true,
    });
  }
  showInfo(message: string, title?: string) {
    this.toastr.info(message, title || 'Información', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title || 'Advertencia', {
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }
}
