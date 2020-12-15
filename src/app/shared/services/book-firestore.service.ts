import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookFirestoreService {

  bookCollection: AngularFirestoreCollection<Book>;
  COLLECTION_NAME = 'books';

  constructor(private afs: AngularFirestore) {
    this.bookCollection = afs.collection(this.COLLECTION_NAME);
  }

  list(): Observable<Book[]> {
    return this.bookCollection.valueChanges({idField: 'id'});
  }

  findById(id: string): Observable<Book> {
    return this.bookCollection.doc(id).get().pipe(map(document => new Book(document.id, document.data())));
  }

  findBooksAvailables(): Observable<Book[]> {
    let booksAvailable: AngularFirestoreCollection<Book>;
    booksAvailable = this.afs.collection(this.COLLECTION_NAME, ref => ref.where('available', '==', true));
    return booksAvailable.valueChanges();
  }

  add(Book: Book): Observable<object> {
    return from(this.bookCollection.add(Object.assign({}, Book)));
  }

  update(Book: Book): Observable<void> {
    return from(this.bookCollection.doc(Book.id).update(Object.assign({}, Book)));
  }

  remove(id: string): Observable<void> {
    return from(this.bookCollection.doc(id).delete());
  }
}
