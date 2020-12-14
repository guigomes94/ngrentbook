import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorFirestoreService } from 'src/app/shared/services/author-firestore.service';
import { Author } from '../../shared/models/author.model';
import { AuthorFormDialogComponent } from './author-form-dialog/author-form-dialog.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css', '../../app.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Author[];
  author: Author;
  dataSource: MatTableDataSource<Author>;
  showColumns = ['id', 'name', 'actions'];

  constructor(
    private authorFirestoreService: AuthorFirestoreService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.authorFirestoreService.list().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  addAuthor(): void {
    const dialogRef = this.dialog.open(AuthorFormDialogComponent, {
      minWidth: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe();
  }

  edit(Author: Author): void {
    const dialogRef = this.dialog.open(AuthorFormDialogComponent, {
      minWidth: '300px',
      data: {
        data: Author,
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  remove(Author: Author): void {
    this.authorFirestoreService.remove(Author.id).subscribe();
  }

}
