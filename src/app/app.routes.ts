import { Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ProductsComponent} from "./products/products.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutUsComponent} from "./landing-page/about-us/about-us.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {ProductPageComponent} from "./products/product-page/product-page.component";
import {UserScreenComponent} from "./user-screen/user-screen.component";
import {AdminComponent} from "./admin/admin.component";
import {ShoppingCartComponent} from "./header/shopping-cart/shopping-cart.component";
import {OrderItemsOfOrderComponent} from "./shared/order-items-of-order/order-items-of-order.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SuccessComponent} from "./payment/success/success.component";
import {CancelComponent} from "./payment/cancel/cancel.component";
import {ForgotPasswordComponent} from "./authentication/login/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./authentication/login/forgot-password/reset-password/reset-password.component";
import {EmailSentComponent} from "./shared/email-sent/email-sent.component";

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
    path: 'forgot-password',
    title: 'Reset Password - Webshop',
    component: ForgotPasswordComponent,
  },
  {
    path: 'email-sent',
    title: 'Email Sent - Webshop',
    component: EmailSentComponent,
  },
  {
    path: 'reset-password',
    title: 'Reset Password - Webshop',
    component: ResetPasswordComponent,
  },
  {
    path: 'register',
    title: 'Register - Webshop',
    component: RegisterComponent,
  },
  {
    path: 'user',
    title: 'User - Webshop',
    component: UserScreenComponent,
  },
  {
    path: 'admin',
    title: 'Admin - Webshop',
    component: AdminComponent,
  },
  {
    path: 'shopping-cart',
    title: 'Shopping Cart - Webshop',
    component: ShoppingCartComponent,
  },
  {
    path: 'order-items',
    title: 'Order Items - Webshop',
    component: OrderItemsOfOrderComponent,
  },
  {
    path: 'not-found',
    title: 'Page Not Found',
    component: NotFoundComponent,
  },
  {
    path: 'success',
    title: 'Thanks for your Order',
    component: SuccessComponent,
  },
  {
    path: 'cancel',
    title: 'Order Canceled',
    component: CancelComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];
