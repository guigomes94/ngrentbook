import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rent } from '../models/rent.model';

@Injectable({
  providedIn: 'root'
})
export class RentFirestoreService {

  rentCollection: AngularFirestoreCollection<Rent>;
  COLLECTION_NAME = 'rents';

  constructor(private afs: AngularFirestore) {
    this.rentCollection = afs.collection(this.COLLECTION_NAME);
  }

  list(): Observable<Rent[]> {
    return this.rentCollection.valueChanges({idField: 'id'});
  }

  findById(id: string): Observable<Rent> {
    return this.rentCollection.doc(id).get().pipe(map(document => new Rent(document.id, document.data())));
  }

  add(Rent: Rent): Observable<object> {
    return from(this.rentCollection.add(Object.assign({}, Rent)));
  }

  update(Rent: Rent): Observable<void> {
    return from(this.rentCollection.doc(Rent.id).update(Object.assign({}, Rent)));
  }

  remove(id: string): Observable<void> {
    return from(this.rentCollection.doc(id).delete());
  }

}
