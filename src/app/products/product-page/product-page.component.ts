import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {Product} from "../../models/Product.model";
import {gsap} from "gsap";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductService],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.less'
})
export class ProductPageComponent implements OnInit{
  product!: Product;
  productName = "";

  constructor(@Inject(DOCUMENT) private document: Document,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.productName = params['productName'];
      }
    );
    this.productService.fetchProduct(this.productName).subscribe(
      product =>{
        this.product = product.payload;
      }
    );
    this.initialAnimations();
  }

  //Carsoul
  carsoulButtonsVisible = false;

  images = ['./assets/parfum1.jpg', './assets/parfum2.jpg', /* more images */];
  currentIndex = 0;

  showPrevImage() {
    this.currentIndex = (this.currentIndex + this.images.length - 1) % this.images.length;
  }

  showNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  //Animation
  @ViewChild('Main', {static: true}) main!: ElementRef<HTMLDivElement>;
  initialAnimations(): void{
    gsap.from(this.main.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    });
  }
}
