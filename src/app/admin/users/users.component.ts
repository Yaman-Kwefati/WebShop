import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User.model";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  providers: [UserService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.less'
})
export class UsersComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Firstname', 'Lastname', 'Email', 'Phone Num', 'PostalCode', 'Street', 'City'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild("MatPaginator") paginator!: MatPaginator;

  constructor(private userService: UserService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.userService.fetchUsers().subscribe(
      users => {
        this.dataSource.data = users.payload;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
