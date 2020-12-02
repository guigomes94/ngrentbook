import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {

  userCollection: AngularFirestoreCollection<User>;
  COLLECTION_NAME = 'users';

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection(this.COLLECTION_NAME);
  }

  list(): Observable<User[]> {
    return this.userCollection.valueChanges({idField: 'id'});
  }

  findById(id: string): Observable<User> {
    return this.userCollection.doc(id).get().pipe(map(document => new User(document.id, document.data())));
  }

  add(user: User): Observable<object> {
    return from(this.userCollection.add(Object.assign({}, user)));
  }

  update(user: User): Observable<void> {
    return from(this.userCollection.doc(user.id).update(Object.assign({}, user)));
  }

  remove(id: string): Observable<void> {
    return from(this.userCollection.doc(id).delete());
  }
}
