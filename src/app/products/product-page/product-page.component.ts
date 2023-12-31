import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {Product} from "../../models/Product.model";
import {gsap} from "gsap";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CartProduct, ShoppingCartService} from "../../services/shopping-cart.service";
import {FileService} from "../../services/File.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ProductAccordionComponent} from "./product-accordion/product-accordion.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductAccordionComponent],
  providers: [ProductService, FileService],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.less'
})
export class ProductPageComponent implements OnInit{
  product!: Product;
  productName = "";
  fileURL: SafeUrl = '';
  touchStartX = 0;
  touchEndX = 0;
  touchStartY = 0;
  touchEndY = 0;
  minSwipeDistance = 30; // Minimum distance to be considered a swipe


  constructor(@Inject(DOCUMENT) private document: Document,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService,
              private fileService: FileService) {
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
        if (this.product.images){
          this.images = this.product.images;
          this.loadFile(this.images[this.currentIndex]);
          this.loadFileForImagesArray();
        }
      }
    );
    this.initialAnimations();
  }

  handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  handleTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
    this.touchEndY = event.touches[0].clientY;
  }

  handleTouchEnd() {
    let deltaX = this.touchStartX - this.touchEndX;
    let deltaY = this.touchStartY - this.touchEndY;

    // Check if the swipe is more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      if (deltaX > 0) {
        this.showNextImage();
      } else {
        this.showPrevImage();
      }
    }
  }


  addToShoppingCart(product: Product) {
    let cartProduct: CartProduct = { product: product, quantity: 1, totalPrice: product.price };
    this.cartService.addToCart(cartProduct);
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
  fileURLArray: SafeUrl[] = [];
  loadFileForImagesArray() {
    for (var imageName of this.images){
      this.fileService.fetchFile(imageName).subscribe(
        blob => {
          const objectUrl = URL.createObjectURL(blob);
          this.fileURLArray.push(this.sanitizer.bypassSecurityTrustUrl(objectUrl));
        },
        error => {
          console.error('Error loading image', error);
        }
      );
    }
  }

  //Carsoul
  carsoulButtonsVisible = false;

  images: string[] = [];
  currentIndex = 0;

  showPrevImage() {
    this.currentIndex = (this.currentIndex + this.images.length - 1) % this.images.length;
    this.loadFile(this.images[this.currentIndex]);
  }

  showNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.loadFile(this.images[this.currentIndex]);
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
