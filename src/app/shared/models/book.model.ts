export class Book {
  id?: string;
  title?: string;
  author?: string;
  available?: boolean;

  constructor(id?: string, book: Book = {}) {
    this.id = id;
    this.title = book.title;
    this.author = book.author;
    this.available = book.available;
  }
}
