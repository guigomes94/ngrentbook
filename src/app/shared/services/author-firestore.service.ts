import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorFirestoreService {

  authorCollection: AngularFirestoreCollection<Author>;
  COLLECTION_NAME = 'authors';

  constructor(private afs: AngularFirestore) {
    this.authorCollection = afs.collection(this.COLLECTION_NAME);
  }

  list(): Observable<Author[]> {
    return this.authorCollection.valueChanges({idField: 'id'});
  }

  findById(id: string): Observable<Author> {
    return this.authorCollection.doc(id).get().pipe(map(document => new Author(document.id, document.data())));
  }

  add(Author: Author): Observable<object> {
    return from(this.authorCollection.add(Object.assign({}, Author)));
  }

  update(Author: Author): Observable<void> {
    return from(this.authorCollection.doc(Author.id).update(Object.assign({}, Author)));
  }

  remove(id: string): Observable<void> {
    return from(this.authorCollection.doc(id).delete());
  }
}
