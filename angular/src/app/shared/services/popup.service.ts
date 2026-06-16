import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  popupVisible = false;

  popupTitle = '';

  popupMessage = '';

  openSuccess(message: string) {
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.popupVisible = true;
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  openError(message: string) {
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.popupVisible = true;

    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.popupVisible = false;
  }
}
