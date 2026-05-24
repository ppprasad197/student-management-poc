import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { studentReducer } from './features/student/store/student.reducer';
import { StudentEffects } from './features/student/store/student.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { BookEffects } from './features/book/store/book.effects';
import { bookReducer } from './features/book/store/book.reducer';
import { FineEffects } from './features/fine/store/fine.effects';
import { fineReducer } from './features/fine/store/fine.reducer';
import { userReducer } from './features/user/store/user.reducer';
import { UserEffects } from './features/user/store/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideStore({
    auth: authReducer, students: studentReducer, books: bookReducer,
    fines: fineReducer, users: userReducer
  }),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: false
  }),
  provideEffects([AuthEffects, StudentEffects, BookEffects, FineEffects, UserEffects]),
  provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
