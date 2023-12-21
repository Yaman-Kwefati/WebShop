import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less'
})
export class AdminComponent implements OnInit{

  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.fetchUsers().subscribe(
      users => {
        console.log(users);
      }
    )
  }
}
