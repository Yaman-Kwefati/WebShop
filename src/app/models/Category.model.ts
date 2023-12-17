import {Product} from "./Product.model";

export class Category{
  private _id: number;
  private _name: string;
  private _productList: Product[];


  constructor(id: number, name: string, productList: Product[]) {
    this._id = id;
    this._name = name;
    this._productList = productList;
  }


  get id(): number {
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

  get productList(): Product[] {
    return this._productList;
  }

  set productList(value: Product[]) {
    this._productList = value;
  }
}
