
export class User{
  _id: number;
  _firstname: string;
  _lastname: string;
  _email: string;
  _phoneNumber: string;
  _city: string;
  _street: string;
  _postalCode: string;
  _userRole: string;
  _authorities?: { authority: string }[];


  constructor(id: number, firstname: string, lastname: string, email: string,
              phoneNumber: string, city: string, street: string,
              postalCode: string, userRole: string, authorities?: { authority: string }[]) {
    this._id = id;
    this._firstname = firstname;
    this._lastname = lastname;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._city = city;
    this._street = street;
    this._postalCode = postalCode;
    this._userRole = userRole;
    this._authorities = authorities;
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

  get userRole(): string {
    return this._userRole;
  }

  set userRole(value: string) {
    this._userRole = value;
  }
}
