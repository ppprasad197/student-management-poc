import { Routes } from '@angular/router';
import { SignupComponent } from './shared/components/signup/signup.component';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { StudentListComponent } from './features/student/components/student-list/student-list.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "signup", component: SignupComponent },
    { path: "login", component: LoginComponent },
    { path: "student", component: StudentListComponent }

];
