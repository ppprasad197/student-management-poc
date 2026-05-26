import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { returnBook } from '../store/book.actions';
import { BorrowedBook } from '../models/borrowed-book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/books";

  getBooks() {
    return this.http.get<Book[]>(this.baseUrl);
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
    return this.http.post<Book>(
      `${this.baseUrl}/borrow/${id}`,
      {}
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

  getAllBorrowedBooksByStudents() {
    return this.http.get<any[]>(
      'http://localhost:8080/borrowRecord/getAllBorrowedBooksByStudents'
    );
  }
}
