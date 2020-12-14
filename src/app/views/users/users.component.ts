import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../shared/models/user.model';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { UserFirestoreService } from '../../shared/services/user-firestore.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../app.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  imgPath = '../../../assets/emptyAvatar.jpg';

  constructor(
    public dialog: MatDialog,
    public userFirestoreService: UserFirestoreService
  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.userFirestoreService.list().subscribe(data => {
      this.users = data;
    })
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      minWidth: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe();
  }

  edit(user: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      minWidth: '600px',
      data: {
        data: user,
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  remove(user: User): void {
    this.userFirestoreService.remove(user.id).subscribe();
  }
}
