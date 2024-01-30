import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Product} from "../../../models/Product.model";
import {OrderItem} from "../../../models/OrderItem.model";
import {FileService} from "../../../services/File.service";

@Component({
  selector: 'app-user-order-details-product',
  standalone: true,
  imports: [CommonModule],
  providers: [FileService],
  templateUrl: './user-order-details-product.component.html',
  styleUrl: './user-order-details-product.component.less'
})
export class UserOrderDetailsProductComponent implements OnInit{
  @Input() product!: Product | undefined;
  @Input() orderItem!: OrderItem;
  @Input() productImageName!: string;
  fileURL: SafeUrl = '';

  constructor(private fileService: FileService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    if (this.product!.images) this.loadFile(this.productImageName);
  }

  async loadFile(filename: string) {
    await this.fileService.fetchFile(filename).toPromise().then(
      blob => {
        const objectUrl = URL.createObjectURL(blob!);
        this.fileURL = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      error => {
        console.error('Error loading image', error);
      }
    );
  }
}
