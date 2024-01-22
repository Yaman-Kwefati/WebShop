import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT, NgOptimizedImage} from '@angular/common';
import {Product} from "../../models/Product.model";
import {gsap} from "gsap";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CartProduct, ShoppingCartService} from "../../services/shopping-cart.service";
import {FileService} from "../../services/File.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ProductAccordionComponent} from "./product-accordion/product-accordion.component";
import {OurSkillsComponent} from "../../shared/our-skills/our-skills.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductAccordionComponent, NgOptimizedImage, OurSkillsComponent],
  providers: [ProductService, FileService],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.less'
})
export class ProductPageComponent implements OnInit{
  product!: Product;
  productName = "";
  images: string[] = [];
  fileURLArray: SafeUrl[] = [];
  fileURL: SafeUrl = '';
  imagesLoaded = false;

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
      product => {
        this.product = product.payload;
        if (this.product.images) {
          this.images = this.product.images;
          this.loadFileForImagesArray().then(
            () => {
              this.imagesLoaded = true;
              this.fileURL = this.fileURLArray[0];
            }
          );
        }
      }
    );
    if (this.product != null){
      this.initialAnimations();
    }
  }
  addToShoppingCart(product: Product) {
    let cartProduct: CartProduct = { product: product, quantity: 1, totalPrice: product.price };
    this.cartService.addToCart(cartProduct);
  }
  async loadFileForImagesArray() {
    this.imagesLoaded = false;
    for (let i = 0; i < this.images.length; i++) {
      await this.fileService.fetchFile(this.images[i]).toPromise().then(
        blob  => {
          const objectUrl = URL.createObjectURL(blob!);
          this.fileURLArray.push(this.sanitizer.bypassSecurityTrustUrl(objectUrl));
        },
        error => {
          console.error('Error loading image', error);
        }
      );
    }
    this.imagesLoaded = true;
  }
  currentIndex = 0;

  showPrevImage() {
    this.currentIndex = (this.currentIndex + this.images.length - 1) % this.images.length;
    this.loadFile(this.images[this.currentIndex]);
  }

  showNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.loadFile(this.images[this.currentIndex]);
  }
  loadFile(filename: string) {
    this.fileService.fetchFile(filename).subscribe(
      blob => {
        const objectUrl = URL.createObjectURL(blob);
        this.fileURL = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      error => {
        // console.error('Error loading image', error);
      }
    );
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
