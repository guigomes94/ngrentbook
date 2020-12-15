import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Rent } from 'src/app/shared/models/rent.model';
import { RentFirestoreService } from 'src/app/shared/services/rent-firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSourceRents: MatTableDataSource<Rent>;
  dataSourceDevolutions: MatTableDataSource<Rent>;
  showColumnsRents = ['title', 'rentDate'];
  showColumnsDevolutions = ['title', 'devolutionDate'];

  constructor(
    private rentFirestoreService: RentFirestoreService,
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    let today = new Date();
    let minus7 = moment().subtract(7, 'days');
    let behind = new Date(minus7.format("YYYY-MM-DD HH:mm Z"));
    let plus7 = moment().add(7, 'days');
    let after = new Date(plus7.format("YYYY-MM-DD HH:mm Z"));

    this.rentFirestoreService.list().subscribe( data => {
      this.dataSourceRents = new MatTableDataSource(data.filter(
        r => this.formatDate(r.rentDate) <= today && this.formatDate(r.rentDate) >= behind)
      )
      this.dataSourceDevolutions = new MatTableDataSource(data.filter(
        r => this.formatDate(r.devolutionDate) >= today && this.formatDate(r.devolutionDate) <= after)
      );
    });
  }

  formatDate(value: any) : Date {
    let data = moment.unix(value.seconds);
    let dateOut: moment.Moment = moment(data, "YYYY-MM-DDTHH:mm:ss");
    let dateString: string = dateOut.format("YYYY-MM-DD HH:mm Z");
    return new Date(dateString);
  }

}
