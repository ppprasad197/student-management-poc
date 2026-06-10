import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-view-dialog',
  standalone: true,
  imports: [],
  templateUrl: './user-view-dialog.component.html',
  styleUrl: './user-view-dialog.component.css'
})
export class UserViewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public user: User) { }
}
