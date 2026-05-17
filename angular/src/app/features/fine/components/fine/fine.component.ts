import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FineSelectors from '../../store/fine.selectors';
import * as FineActions from '../../store/fine.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as AuthSelectors from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-fine',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './fine.component.html',
  styleUrl: './fine.component.css'
})
export class FineComponent {
  private store = inject(Store);

  fines = this.store.select(
    FineSelectors.selectMyFines
  );

  summary = this.store.select(
    FineSelectors.selectFineSummary
  );

  allStudentFines$ =
    this.store.select(
      FineSelectors.selectAllStudentFines
    );

  currentUser =
    this.store.select(
      AuthSelectors.selectCurrentUser
    );

  ngOnInit() {
    console.log("Fine actions dispatched");
    this.store.dispatch(
      FineActions.loadMyFines()
    );

    this.store.dispatch(
      FineActions.loadFineSummary()
    );

    this.currentUser
      .subscribe((user) => {
        if (!user) return;
        if (
          user.role === 'ADMIN'
          ||
          user.role === 'LIBRARIAN'
        ) {
          this.store.dispatch(
            FineActions.loadAllStudentFines()
          );
        }

        else if (
          user.role === 'STUDENT'
        ) {
          this.store.dispatch(
            FineActions.loadMyFines()
          );
          this.store.dispatch(
            FineActions.loadFineSummary()
          );
        }
      });
  }

  payFine(amount: number) {
    console.log("total fine amount : " + amount);
    this.store.dispatch(
      FineActions.payFine({ amount })
    );
  }


}
