import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../../shared/models/reservation.model';
import { ReservationFirestoreService } from '../../shared/services/reservation-firestore.service';
import { ReservationFormDialogComponent } from './reservation-form-dialog/reservation-form-dialog.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css', '../../app.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  reservation: Reservation;
  dataSource: MatTableDataSource<Reservation>;
  showColumns = ['id', 'user', 'title', 'rentDate', 'actions'];

  constructor(
    private reservationFirestoreService: ReservationFirestoreService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  filter(texto: string): void {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  listAll() {
    this.reservationFirestoreService.list().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  addReservation(): void {
    const dialogRef = this.dialog.open(ReservationFormDialogComponent, {
      minWidth: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe();
  }

  edit(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ReservationFormDialogComponent, {
      minWidth: '450px',
      data: {
        data: reservation,
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  remove(reservation: Reservation): void {
    this.reservationFirestoreService.remove(reservation.id).subscribe();
  }

}
