export class User {

  static fromFirebase( { uid, username, email }:any ) {
    return new User(uid,username, email)
  }

  constructor(
    public uid:      string,
    public username: string,
    public email:    string,
  ) {}
}
