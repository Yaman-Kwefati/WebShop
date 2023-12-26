import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {OrderService} from "../../services/order.service";
import {ShopOrder} from "../../models/ShopOrder.model";
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, RouterLink, MatInputModule, MatSelectModule],
  providers: [OrderService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.less'
})
export class OrdersComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['orderId', 'User Id', 'OrderStatus', 'OrderDate', 'Total Amount'];
  dataSource = new MatTableDataSource<ShopOrder>();
  statuses: string[] = ['PLACED', 'SHIPPED', 'DELIVERED', 'DECLINED', 'CANCELLED'];
  showSaveStatusButton = false;
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

  changeOrderStatus(orderId: number, orderStatus: string) {
    this.orderService.updateOrderStatus(orderId, orderStatus);
  }
}
