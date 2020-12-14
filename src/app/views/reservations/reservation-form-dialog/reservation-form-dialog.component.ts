import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../../shared/models/book.model';
import { Reservation } from '../../../shared/models/reservation.model';
import { User } from '../../../shared/models/user.model';
import { BookFirestoreService } from '../../../shared/services/book-firestore.service';
import { ReservationFirestoreService } from '../../../shared/services/reservation-firestore.service';
import { UserFirestoreService } from '../../../shared/services/user-firestore.service';

@Component({
  selector: 'app-reservation-form-dialog',
  templateUrl: './reservation-form-dialog.component.html',
  styleUrls: ['./reservation-form-dialog.component.css']
})
export class ReservationFormDialogComponent implements OnInit {

  reservation: Reservation;

  books: Book[];
  users: User[];

  public reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationFirestoreService: ReservationFirestoreService,
    private bookFirestoreService: BookFirestoreService,
    private userFirestoreService: UserFirestoreService,
    public dialogRef: MatDialogRef<ReservationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reservation = data.data
  }

  ngOnInit(): void {

    this.listUsers();
    this.listBooks();

    if (this.reservation) {
      this.reservationForm = this.fb.group({
        id: [this.reservation.id],
        user: [this.reservation.user, [Validators.required]],
        book: [this.reservation.book, [Validators.required]],
        rentDate: [this.reservation.rentDate, [Validators.required]],
      })
    } else {
      this.reservationForm = this.fb.group({
        user: ['', [Validators.required]],
        book: ['', [Validators.required]],
        rentDate: ['', [Validators.required]],
      })
    }
  }

  listUsers() {
    this.userFirestoreService.list().subscribe(data => {
      this.users = data;
    })
  }

  listBooks() {
    this.bookFirestoreService.list().subscribe(data => {
      this.books = data;
    })
  }

  createOrUpdateReservation(){
    const reservation = this.reservationForm.value;

    if (reservation.id) {
      this.reservationFirestoreService.update(reservation).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.reservationFirestoreService.add(reservation).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

    this.reservationForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.reservationForm.reset();
  }

}
