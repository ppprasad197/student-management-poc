import { Component, inject } from '@angular/core';
import * as AuthSelectors from '../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private store = inject(Store);

  currentUser$ = this.store.select(
    AuthSelectors.selectCurrentUser
  );
}
