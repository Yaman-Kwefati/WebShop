import { Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ProductsComponent} from "./products/products.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutUsComponent} from "./landing-page/about-us/about-us.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {ProductPageComponent} from "./products/product-page/product-page.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Home - Webshop',
    component: LandingPageComponent,
  },
  {
    path: 'products',
    title: 'Producten - Webshop',
    component: ProductsComponent,
  },
  {
    path: 'products/:productName',
    title: 'Product - Webshop',
    component: ProductPageComponent,
  },
  {
    path: 'contact',
    title: 'Contact - Webshop',
    component: ContactComponent,
  },
  {
    path: 'aboutUs',
    title: 'Over Ons - Webshop',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    title: 'Login - Webshop',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register - Webshop',
    component: RegisterComponent,
  },
];
