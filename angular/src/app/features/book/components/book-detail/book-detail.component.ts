import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  book: any;

  constructor(private location: Location) { }

  ngOnInit() {
    this.book = history.state.book;
  }

  goBack() {
    this.location.back();
  }

}
