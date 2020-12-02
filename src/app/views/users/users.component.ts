import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { UserFirestoreService } from '../../shared/services/user-firestore.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../app.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  user: User;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public userFirestoreService: UserFirestoreService
  ) { }

  ngOnInit() {
    // this.getAllUsers();
    this.listByFirestore();
  }

  getAllUsers() {
    this.userService.listAll().subscribe( data => {
        this.users = data;
      });
  }

  /*addUser(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      minWidth: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users.push(result);
      }
    });
  }

  edit(user: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      minWidth: '600px',
      data: {
        data: user,
      }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          const indiceAEditar = this.users.findIndex(u => u.id === res.id);
          this.users[indiceAEditar] = res
        }
      }
    );
  }

  remove(user: User): void {
    this.userService.remove(user.id).subscribe(
      res => {
        const indiceARemover = this.users.findIndex(u => u.id === user.id);
        if (indiceARemover > -1) {
          this.users.splice(indiceARemover, 1);
        }
      }
    );
  }*/

  listByFirestore() {
    this.userFirestoreService.list().subscribe(data => {
      this.users = data;
    })
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      minWidth: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users.push(result);
        this.users.pop();
      }
    });
  }

  edit(user: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      minWidth: '600px',
      data: {
        data: user,
      }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          const indiceAEditar = this.users.findIndex(u => u.id === res.id);
          this.users[indiceAEditar] = res
        }
      }
    );
  }

  remove(user: User): void {
    this.userFirestoreService.remove(user.id).subscribe(
      res => {
        const indiceARemover = this.users.findIndex(u => u.id === user.id);
        if (indiceARemover > -1) {
          this.users.splice(indiceARemover, 1);
        }
      }
    );
  }
}
