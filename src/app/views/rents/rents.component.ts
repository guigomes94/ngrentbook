import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Rent } from '../../shared/models/rent.model';
import { RentFirestoreService } from '../../shared/services/rent-firestore.service';
import { RentFormDialogComponent } from './rent-form-dialog/rent-form-dialog.component';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css', '../../app.component.css']
})
export class RentsComponent implements OnInit {

  rents: Rent[];
  rent: Rent;
  dataSource: MatTableDataSource<Rent>;
  showColumns = ['id', 'user', 'title', 'rentDate', 'devolutionDate', 'paymentValue','actions'];

  constructor(
    private rentFirestoreService: RentFirestoreService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.rentFirestoreService.list().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  addRent(): void {
    const dialogRef = this.dialog.open(RentFormDialogComponent, {
      minWidth: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe();
  }

  edit(Rent: Rent): void {
    const dialogRef = this.dialog.open(RentFormDialogComponent, {
      minWidth: '450px',
      data: {
        data: Rent,
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  remove(Rent: Rent): void {
    this.rentFirestoreService.remove(Rent.id).subscribe();
  }

}
