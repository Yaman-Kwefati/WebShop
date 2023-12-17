export class ShopOrder {
  private _id: number;
  private _userId: number;
  private _orderStatus: string;
  private _orderDate: Date;
  private _totalAmount: number;


  constructor(id: number, userId: number, orderStatus: string, orderDate: Date, totalAmount: number) {
    this._id = id;
    this._userId = userId;
    this._orderStatus = orderStatus;
    this._orderDate = orderDate;
    this._totalAmount = totalAmount;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get orderStatus(): string {
    return this._orderStatus;
  }

  set orderStatus(value: string) {
    this._orderStatus = value;
  }

  get orderDate(): Date{
    return this._orderDate;
  }
  set orderDate(value: Date) {
    this._orderDate = value;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  set totalAmount(value: number) {
    this._totalAmount = value;
  }
}
