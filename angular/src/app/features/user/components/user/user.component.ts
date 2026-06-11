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
import { MatDialog } from '@angular/material/dialog';
import { UserViewDialogComponent } from '../user-view-dialog/user-view-dialog.component';


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
  private dialog = inject(MatDialog);

  allUsers: User[] = [];
  filteredUsers: User[] = [];
  selectedStatus = 'ALL';

  page = 0;
  size = 5;

  currentPage = 0;
  totalPages = 0;

  users = this.store.select(UserSelectors.selectUserPage);

  ngOnInit() {

    this.store.select(UserSelectors.selectCurrentPage)
      .pipe(first())
      .subscribe(page => {
        this.page = page ?? 0;
        this.loadUsers();
      });

    this.users.subscribe(data => {
      this.allUsers = data.users;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
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

  loadUsers() {
    this.store.dispatch(UserActions.loadUsers({
      page: this.page,
      size: this.size
    })
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.page++;

      this.store.dispatch(
        UserActions.setCurrentPage({
          page: this.page
        })
      );

      this.loadUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page--;

      this.store.dispatch(
        UserActions.setCurrentPage({
          page: this.page
        })
      );
      this.loadUsers();
    }
  }

  viewUser(user: User) {
    this.dialog.open(UserViewDialogComponent, {
      width: '600px', data: user
    })
  }
}
