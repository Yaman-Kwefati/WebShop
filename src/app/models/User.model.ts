
export class User{
  _id: number;
  _firstname: string;
  _lastname: string;
  _email: string;
  _password: string;
  _phoneNumber: string;
  _city: string;
  _street: string;
  _postalCode: string;
  _role: string;
  _access_token?: string;
  _refresh_token?: string;


  constructor(id: number, firstname: string, lastname: string, email: string, password: string, phoneNumber: string, city: string, street: string, postalCode: string, role: string,
              accessToken?: string, refreshToken?: string) {
    this._id = id;
    this._firstname = firstname;
    this._lastname = lastname;
    this._email = email;
    this._password = password;
    this._phoneNumber = phoneNumber;
    this._city = city;
    this._street = street;
    this._postalCode = postalCode;
    this._role = role;
    this._access_token = accessToken;
    this._refresh_token = refreshToken;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }


  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(value: string) {
    this._postalCode = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }


  get access_token(): any {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  get refresh_token(): any {
    return this._refresh_token;
  }

  set refresh_token(value: string) {
    this._refresh_token = value;
  }
}
