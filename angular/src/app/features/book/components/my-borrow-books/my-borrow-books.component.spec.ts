import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBorrowBooksComponent } from './my-borrow-books.component';

describe('MyBorrowBooksComponent', () => {
  let component: MyBorrowBooksComponent;
  let fixture: ComponentFixture<MyBorrowBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBorrowBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBorrowBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
