import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FineSelectors from '../../store/fine.selectors';
import * as FineActions from '../../store/fine.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  ngOnInit() {
    console.log("Fine actions dispatched");
    this.store.dispatch(
      FineActions.loadMyFines()
    );

    this.store.dispatch(
      FineActions.loadFineSummary()
    );
  }

  payFine(amount: number) {
    console.log("total fine amount : " + amount);
    this.store.dispatch(
      FineActions.payFine({ amount })
    );
  }
}
