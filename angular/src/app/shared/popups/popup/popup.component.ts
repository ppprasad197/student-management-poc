import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(
    public popupService: PopupService
  ) { }

  get showPopup() {
    return this.popupService.popupVisible;
  }

  get popupTitle() {
    return this.popupService.popupTitle;
  }

  get popupMessage() {
    return this.popupService.popupMessage;
  }

  closePopup() {
    this.popupService.close();
  }
}
