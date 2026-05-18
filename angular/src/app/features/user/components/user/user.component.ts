import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../store/user.selectors';
import * as UserActions from '../../store/user.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users: Observable<User[]>;  

  constructor(private store: Store) {
    this.users = this.store.select(UserSelectors.selectUsers);
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }

  approveUser(id: number) {
    this.store.dispatch(UserActions.approveUser({ id }));
  }

  deleteUser(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmed) {
      this.store.dispatch(
        UserActions.deleteUser({ id })
      );
    }
  }
}
