import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {ProductService} from "../app/services/product.service";
import {Product} from "../app/models/Product.model";

interface ApiResponse<T> {
  code: string;
  payload: T;
  message: string;
}

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    window.onbeforeunload = () => "Oh no!";
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch products', () => {
    const dummyProducts: Product[] = [
      // @ts-ignore
      { name: 'Product 1', description: 'Desc 1', price: 10, stockQuantity: 5, images: [] },
      // @ts-ignore
      { name: 'Product 2', description: 'Desc 2', price: 20, stockQuantity: 3, images: [] },
    ];

    const mockResponse: ApiResponse<Product[]> = {
      code: '200',
      payload: dummyProducts,
      message: 'Products fetched successfully',
    };

    service.fetchProducts().subscribe((response: any) => {
      expect(response.payload.length).toBe(2);
      expect(response.payload).toEqual(dummyProducts);
      expect(response.message).toBe('Products fetched successfully');
    });

    const req = httpMock.expectOne('/api/v1/products/all-products');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
