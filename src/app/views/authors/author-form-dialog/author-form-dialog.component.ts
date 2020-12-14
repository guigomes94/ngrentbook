import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorFirestoreService } from 'src/app/shared/services/author-firestore.service';
import { Author } from '../../../shared/models/author.model';

@Component({
  selector: 'app-author-form-dialog',
  templateUrl: './author-form-dialog.component.html',
  styleUrls: ['./author-form-dialog.component.css']
})
export class AuthorFormDialogComponent implements OnInit {

  author: Author;

  public authorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authorFirestoreService: AuthorFirestoreService,
    public dialogRef: MatDialogRef<AuthorFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.author = data.data
  }

  ngOnInit(): void {

    if (this.author) {
      this.authorForm = this.fb.group({
        id: [this.author.id],
        name: [this.author.name, [Validators.required]],
      })
    } else {
      this.authorForm = this.fb.group({
        name: ['', [Validators.required]],
      })
    }
  }

  createOrUpdateAuthor(){
    const author = this.authorForm.value;

    if (author.id) {
      this.authorFirestoreService.update(author).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.authorFirestoreService.add(author).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

    this.authorForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.authorForm.reset();
  }


}
