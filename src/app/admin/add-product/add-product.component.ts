import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm} from "@angular/forms";
import {LoadingSpinnerComponent} from "../../shared/loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {FileService} from "../../services/File.service";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, RouterLink],
  providers: [ProductService, FileService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.less'
})
export class AddProductComponent {
  fileNames: string[] = [];
  productAdded = false;

  constructor(private productService: ProductService,
              private fileService: FileService) {
  }
  onsubmit(productForm: NgForm) {
    if (!productForm.valid){
      return;
    }
    const productName = productForm.value.productName;
    const productDescription = productForm.value.productDescription;
    const productPrice = productForm.value.productPrice;
    const productQuantity = productForm.value.productQuantity;
    this.productService.addProduct(productName, productDescription, productPrice, productQuantity, this.fileNames).subscribe(
      res => {
        console.log(res.payload);
        if (res.payload){
          this.productAdded = true;
        }
      }
    )
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let files = element.files;
    if (files) {
      this.fileNames = Array.from(files).map(file => file.name);
      for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        this.fileService.saveFile(file!).subscribe(
          res => {
            console.log(res)
          }
        );
      }
      console.log(this.fileNames);
    }
  }
}
