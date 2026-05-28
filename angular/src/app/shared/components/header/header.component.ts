import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthSelectors from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showProfileMenu = false;

  private store = inject(Store);
  currentUser =
    this.store.select(
      AuthSelectors.selectCurrentUser
    );

  toggleProfileMenu(event: Event) {
    event.stopPropagation();
    this.showProfileMenu =
      !this.showProfileMenu;
  }

  ngOnInit() {
    document.addEventListener(
      'click',
      () => { this.showProfileMenu = false }
    );
  }
}
