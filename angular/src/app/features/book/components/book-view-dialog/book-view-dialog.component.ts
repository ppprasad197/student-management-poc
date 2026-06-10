import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-view-dialog',
  standalone: true,
  imports: [],
  templateUrl: './book-view-dialog.component.html',
  styleUrl: './book-view-dialog.component.css'
})
export class BookViewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public book: Book) { }
}
