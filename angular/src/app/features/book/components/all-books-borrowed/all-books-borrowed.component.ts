import { Component, computed, signal } from '@angular/core';
import { BorrowedBook } from '../../models/borrowed-book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-all-books-borrowed',
  standalone: true,
  imports: [],
  templateUrl: './all-books-borrowed.component.html',
  styleUrl: './all-books-borrowed.component.css'
})
export class AllBooksBorrowedComponent {
  status = signal<'ALL' | 'ACTIVE' | 'RETURNED'>('ALL');
  search = signal('');
  page = 0;
  size = 5;
  totalPages = 0;
  currentPage = 0;

  borrowHistory = signal<BorrowedBook[]>([]);

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.loadBorrowRecords();
  }

  loadBorrowRecords() {
    this.bookService.getBorrowedBooksByStudents(this.currentPage, this.size).subscribe(response => {
      this.borrowHistory.set(response.borrowRecords);
      this.page = response.currentPage;
      this.totalPages = response.totalPages;
    })
  }

  filteredRecords = computed(() => {
    const keyword = this.search().toLowerCase();
    const status = this.status();

    return this.borrowHistory().filter(record => {
      let recordStatus: 'ACTIVE' | 'RETURNED';

      if (record.returnDate) {
        recordStatus = 'RETURNED';
      } else {
        recordStatus = 'ACTIVE';
      }

      const matchesStudent =
        record.studentId.toString().includes(keyword) ||
        record.studentName.toLowerCase().includes(keyword);

      const matchesStatus =
        status === 'ALL'
          ? true
          : recordStatus === status;

      return matchesStudent && matchesStatus;
    });

  });


  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadBorrowRecords();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadBorrowRecords();
    }
  }
}
