export class Author {
  id?: string;
  name?: string;

  constructor(id?: string, user: Author = {}) {
    this.id = id;
    this.name = user.name;
  }
}
