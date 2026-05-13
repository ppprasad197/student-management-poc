import { Routes } from '@angular/router';
import { SignupComponent } from './shared/components/signup/signup.component';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { StudentListComponent } from './features/student/components/student-list/student-list.component';
import { StudentDetailComponent } from './features/student/components/student-detail/student-detail.component';
import { BookListComponent } from './features/book/components/book-list/book-list.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { BookDetailComponent } from './features/book/components/book-detail/book-detail.component';
import { BookFormComponent } from './features/book/components/book-form/book-form.component';
import { BorrowBookComponent } from './features/book/components/borrow-book/borrow-book.component';
import { MyBorrowBooksComponent } from './features/book/components/my-borrow-books/my-borrow-books.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "signup", component: SignupComponent },
    { path: "login", component: LoginComponent },
    { path: "student", component: StudentListComponent },
    { path: "studentDetail", component: StudentDetailComponent },
    { path: "updateStudent", component: SignupComponent },
    { path: "book", component: BookListComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'bookDetails', component: BookDetailComponent },
    { path: 'add-book', component: BookFormComponent },
    { path: 'update-book', component: BookFormComponent },
    { path: "myBorrowedBooks", component: MyBorrowBooksComponent }


];
