import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationFirestoreService {

  reservationCollection: AngularFirestoreCollection<Reservation>;
  COLLECTION_NAME = 'reservations';

  constructor(private afs: AngularFirestore) {
    this.reservationCollection = afs.collection(this.COLLECTION_NAME);
  }

  list(): Observable<Reservation[]> {
    return this.reservationCollection.valueChanges({idField: 'id'});
  }

  findById(id: string): Observable<Reservation> {
    return this.reservationCollection.doc(id).get().pipe(map(document => new Reservation(document.id, document.data())));
  }

  add(Reservation: Reservation): Observable<object> {
    return from(this.reservationCollection.add(Object.assign({}, Reservation)));
  }

  update(Reservation: Reservation): Observable<void> {
    return from(this.reservationCollection.doc(Reservation.id).update(Object.assign({}, Reservation)));
  }

  remove(id: string): Observable<void> {
    return from(this.reservationCollection.doc(id).delete());
  }
}
