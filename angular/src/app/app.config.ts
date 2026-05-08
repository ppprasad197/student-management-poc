import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { studentReducer } from './features/student/store/student.reducer';
import { StudentEffects } from './features/student/store/student.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideStore({ auth: authReducer, students: studentReducer }),
  provideEffects([AuthEffects, StudentEffects]),
  provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
