export class User {
  id?: string;
  avatar?: string;
  name?: string;
  phone?: string;
  email?: string;

  constructor(id?: string, user: User = {}) {
    this.id = id;
    this.avatar = user.avatar;
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email
  }
}
