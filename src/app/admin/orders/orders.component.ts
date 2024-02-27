import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
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
  newStatus = "";
  @ViewChild("MatPaginator") paginator!: MatPaginator;

  constructor(private orderService: OrderService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.fetchOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchOrders() {
    this.orderService.fetchOrders().subscribe(
      orders => {
        this.dataSource.data = orders.payload;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  changeOrderStatus(orderId: number) {
    this.orderService.updateOrderStatus(orderId, this.newStatus).subscribe(
      res => {
        this.fetchOrders();
        this.newStatus = "";
      }
    );
  }
}
