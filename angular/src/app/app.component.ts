import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import * as AuthActions from './store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './shared/popups/popup/popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, PopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(
      AuthActions.getCurrentUser()
    );

  }
}
