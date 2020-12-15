import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../../shared/models/book.model';
import { Rent } from '../../../shared/models/rent.model';
import { User } from '../../../shared/models/user.model';
import { BookFirestoreService } from '../../../shared/services/book-firestore.service';
import { RentFirestoreService } from '../../../shared/services/rent-firestore.service';
import { UserFirestoreService } from '../../../shared/services/user-firestore.service';

@Component({
  selector: 'app-rent-form-dialog',
  templateUrl: './rent-form-dialog.component.html',
  styleUrls: ['./rent-form-dialog.component.css']
})
export class RentFormDialogComponent implements OnInit {

  rent: Rent;

  books: Book[];
  users: User[];

  public rentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rentFirestoreService: RentFirestoreService,
    private bookFirestoreService: BookFirestoreService,
    private userFirestoreService: UserFirestoreService,
    public dialogRef: MatDialogRef<RentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rent = data.data
  }

  ngOnInit(): void {

    this.listUsers();
    this.listBooks();

    if (this.rent) {
      this.rentForm = this.fb.group({
        id: [this.rent.id],
        user: [this.rent.user, [Validators.required]],
        book: [this.rent.book, [Validators.required]],
        rentDate: [this.rent.rentDate, [Validators.required]],
        devolutionDate: [this.rent.devolutionDate, [Validators.required]],
        paymentValue: [this.rent.paymentValue, [Validators.required]]
      })
    } else {
      this.rentForm = this.fb.group({
        user: ['', [Validators.required]],
        book: ['', [Validators.required]],
        rentDate: ['', [Validators.required]],
        devolutionDate: ['', [Validators.required]],
        paymentValue: [0.0, [Validators.required]]
      })
    }
  }

  listUsers() {
    this.userFirestoreService.list().subscribe(data => {
      this.users = data;
    })
  }

  listBooks() {
    this.bookFirestoreService.findBooksAvailables().subscribe(data => {
      this.books = data;
    })
  }

  createOrUpdateRent(){
    const rent = this.rentForm.value;
    rent.paymentValue = Number(rent.paymentValue);

    if (rent.id) {
      this.rentFirestoreService.update(rent).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.rentFirestoreService.add(rent).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

    this.rentForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.rentForm.reset();
  }

}
