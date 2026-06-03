import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  constructor(private location: Location) { }

  user = history.state.user;

  goBack() {
    this.location.back();
  }
}
