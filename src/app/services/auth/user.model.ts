export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    private isAdmin: boolean
  ) {}

  get token() {
    //it will return the token only if it is available and not expired
    return this._tokenExpirationDate && new Date() < this._tokenExpirationDate
      ? this._token
      : null;
  }
}
