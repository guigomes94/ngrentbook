import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Author } from '../../../shared/models/author.model';
import { Book } from '../../../shared/models/book.model';
import { BookFirestoreService } from '../../../shared/services/book-firestore.service';
import { AuthorFirestoreService } from '../../../shared/services/author-firestore.service';

@Component({
  selector: 'app-book-form-dialog',
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.css']
})
export class BookFormDialogComponent implements OnInit {

  book: Book;

  authors: Author[];

  public bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookFirestoreService: BookFirestoreService,
    private authorFirestoreService: AuthorFirestoreService,
    public dialogRef: MatDialogRef<BookFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.book = data.data
  }

  ngOnInit(): void {

    this.listAuthors();

    if (this.book) {
      this.bookForm = this.fb.group({
        id: [this.book.id],
        title: [this.book.title, [Validators.required]],
        author: [this.book.author, [Validators.required]],
        available: [this.book.available.toString(), [Validators.required]],
      })
    } else {
      this.bookForm = this.fb.group({
        title: ['', [Validators.required]],
        author: ['', [Validators.required]],
        available: ['', [Validators.required]],
      })
    }
  }

  listAuthors() {
    this.authorFirestoreService.list().subscribe(data => {
      this.authors = data;
    })
  }

  createOrUpdateBook(){
    const book = this.bookForm.value;

    if (book.available === 'true') {
      book.available = true;
    } else {
      book.available = false;
    }

    if (book.id) {
      this.bookFirestoreService.update(book).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.bookFirestoreService.add(book).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

    this.bookForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.bookForm.reset();
  }

}
