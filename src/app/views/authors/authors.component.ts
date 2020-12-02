import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from '../../shared/models/author.model';
import { AuthorService } from '../../shared/services/author.service';
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
    private AuthorService: AuthorService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllAuthors();
  }

  addAuthor(): void {
    const dialogRef = this.dialog.open(AuthorFormDialogComponent, {
      minWidth: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    });
  }

  getAllAuthors() {
    this.AuthorService.listAll().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  edit(Author: Author): void {
    const dialogRef = this.dialog.open(AuthorFormDialogComponent, {
      minWidth: '300px',
      data: {
        data: Author,
      }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          const indiceAEditar = this.dataSource.data.findIndex(obj => obj.id === res.id);
          this.dataSource.data[indiceAEditar] = res
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
      }
    );
  }

  remove(Author: Author): void {
    this.AuthorService.remove(Author.id).subscribe(
      res => {
        const indiceARemover = this.dataSource.data.findIndex(obj => obj.id === Author.id);
        if (indiceARemover > -1) {
          this.dataSource.data.splice(indiceARemover, 1);
          this.dataSource = new MatTableDataSource<Author>(this.dataSource.data);
        }
      }
    );
  }

}
