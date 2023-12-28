import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../../../../models/Product.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";
import {FileService} from "../../../../services/File.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-result-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [FileService],
  templateUrl: './result-item.component.html',
  styleUrl: './result-item.component.less'
})
export class ResultItemComponent implements OnInit{
  @Input() product!: Product;
  fileURL: SafeUrl = '';

  constructor(private sanitizer: DomSanitizer,
              private fileService: FileService) {
  }
  ngOnInit(): void {
    if (this.product.images){
      this.loadFile(this.product.images[0]);
    }
  }

  loadFile(filename: string) {
    this.fileService.fetchFile(filename).subscribe(
      blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.fileURL = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      error => {
        console.error('Error loading image', error);
      }
    );
  }
}
