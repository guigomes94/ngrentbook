import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../../shared/models/book.model';
import { BookFirestoreService } from '../../shared/services/book-firestore.service';
import { BookFormDialogComponent } from './book-form-dialog/book-form-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css', '../../app.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];
  book: Book;
  dataSource: MatTableDataSource<Book>;
  showColumns = ['id', 'title', 'author', 'available','actions'];

  constructor(
    private bookFirestoreService: BookFirestoreService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.bookFirestoreService.list().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  addBook(): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      minWidth: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe();
  }

  edit(Book: Book): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      minWidth: '450px',
      data: {
        data: Book,
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  remove(Book: Book): void {
    this.bookFirestoreService.remove(Book.id).subscribe();
  }

}
