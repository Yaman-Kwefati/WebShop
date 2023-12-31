export class Product{
  private _id?: number;
  private _name: string;
  private _description: string;
  private _price: number;
  private _images: string[];
  private _stockQuantity: number;

  constructor(name: string, description: string, price: number, images: string[], stockQuantity: number, id?: number) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._price = price;
    this._images = images;
    this._stockQuantity = stockQuantity;
  }


  get id(): number | undefined {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get images(): string[] {
    return this._images;
  }

  set images(value: string[]) {
    this._images = value;
  }

  get stockQuantity(): number {
    return this._stockQuantity;
  }

  set stockQuantity(value: number) {
    this._stockQuantity = value;
  }


}
