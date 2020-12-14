export class Reservation {
  id?: string;
  user?: string;
  book?: string;
  rentDate?: Date;

  constructor(id?: string, reservation: Reservation = {}) {
    this.id = id;
    this.user = reservation.user;
    this.book = reservation.book;
    this.rentDate = reservation.rentDate;
  }
}
