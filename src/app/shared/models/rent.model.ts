export class Rent {
  id?: string;
  user?: string;
  book?: string;
  rentDate?: any;
  devolutionDate?: any;
  paymentValue?: Number;

  constructor(id?: string, rent: Rent = {}) {
    this.id = id;
    this.user = rent.user;
    this.book = rent.book;
    this.rentDate = rent.rentDate;
    this.devolutionDate = rent.devolutionDate;
    this.paymentValue = rent.paymentValue;
  }
}
