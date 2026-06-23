import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { returnBook } from '../store/book.actions';
import { BorrowedBook } from '../models/borrowed-book.model';
import { BookPageResponse } from '../models/BookPageResponse';
import { tap } from 'rxjs';
import { BorrowedBookPageResponse } from '../models/BorrowedBookPageResponse';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/books";

  getBooks(page: number, size: number) {
    return this.http
      .get<BookPageResponse>(
        `${this.baseUrl}?page=${page}&size=${size}`
      )
  }

  addBook(book: Book) {
    return this.http.post<Book>(
      this.baseUrl,
      book
    );
  }

  updateBook(id: number, book: Partial<Book>) {
    return this.http.put<Book>(
      `${this.baseUrl}/${id}`,
      book
    );
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  borrowBook(id: number) {
    return this.http.post(
      `${this.baseUrl}/borrow/${id}`,
      {},
      {
        responseType: 'text'
      }
    );
  }

  returnBook(id: number) {
    return this.http.post(
      `${this.baseUrl}/return/${id}`,
      {},
      {
        responseType: 'text'
      }
    );
  }

  renewBook(id: number) {
    return this.http.post(
      `${this.baseUrl}/renew/${id}`,
      {},
      {
        responseType: 'text'
      }
    );
  }

  getMyBorrowedBooks() {
    return this.http.get<BorrowedBook[]>(
      'http://localhost:8080/borrowRecord/myBorrowedBooks'
    );
  }

  //This method used bu student history
  getAllBorrowedBooksByStudents() {
    return this.http.get<BorrowedBookPageResponse>(
      'http://localhost:8080/borrowRecord/getAllBorrowedBooks'
    );
  }

  //This api for signal implentation and historical data
  getBorrowedBooksByStudents(page: number, size: number) {
    return this.http.get<BorrowedBookPageResponse>(
      `http://localhost:8080/borrowRecord/getAllBorrowedBooks?page=${page}&size=${size}`
    );
  }

  exportBooks() {
    return this.http.get(
      `http://localhost:8080/borrowRecord/export`,
      {
        responseType: 'blob'
      }
    );
  }
}
