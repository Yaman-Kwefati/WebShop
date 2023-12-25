import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Product} from "../../models/Product.model";
import {ProductService} from "../../services/product.service";
import {OrderService} from "../../services/order.service";
import {ShopOrder} from "../../models/ShopOrder.model";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  providers: [OrderService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.less'
})
export class OrdersComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['orderId', 'User Id', 'OrderStatus', 'OrderDate', 'Total Amount'];
  dataSource = new MatTableDataSource<ShopOrder>();
  @ViewChild("MatPaginator") paginator!: MatPaginator;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.fetchOrders().subscribe(
      orders => {
        this.dataSource.data = orders.payload;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
