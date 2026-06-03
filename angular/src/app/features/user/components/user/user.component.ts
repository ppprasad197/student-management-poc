import { Component, inject } from '@angular/core';
import { first, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../store/user.selectors';
import * as UserActions from '../../store/user.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import * as selectStudentState from '../../../student/store/student.selectors';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  private store = inject(Store);
  private router = inject(Router);

  allUsers: User[] = [];
  filteredUsers: User[] = [];
  selectedStatus = 'ALL';

  users = this.store.select(UserSelectors.selectUsers);

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());

    this.users.subscribe(user => {
      this.allUsers = user;
      this.filterUsers();
    });
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

  filterUsers(): void {

    if (this.selectedStatus === 'ALL') {
      this.filteredUsers = [...this.allUsers];
      return;
    }

    this.filteredUsers = this.allUsers.filter(
      user => user.userStatus === this.selectedStatus
    );
  }
}
