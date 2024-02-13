import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Product} from "../../models/Product.model";
import {ProductService} from "../../services/product.service";
import {PopupService} from "../../services/PopUp.service";

@Component({
  selector: 'app-products-tab',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  providers: [ProductService],
  templateUrl: './products-tab.component.html',
  styleUrl: './products-tab.component.less'
})
export class ProductsTabComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Name', 'Description', 'Price', 'Qty'];
  dataSource = new MatTableDataSource<Product>();
  @ViewChild("MatPaginator") paginator!: MatPaginator;

  constructor(private productService: ProductService,
              private popupService: PopupService) {
  }

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe(
      products => {
        this.dataSource.data = products.payload;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      res => {
        if (res.code != "ACCEPTED") this.popupService
          .showMessage("Couldn't delete product", "error", "w-4/6 max-md:w-full");
        if (res.code == "ACCEPTED")
          this.popupService.showMessage('Product deleted', 'success', 'w-4/6 max-md:w-full');
      }
    )
  }
}
