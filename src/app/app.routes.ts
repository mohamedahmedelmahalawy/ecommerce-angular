import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Brands } from './pages/brands/brands';
import { Categories } from './pages/categories/categories';
import { Checkout } from './pages/checkout/checkout';
import { Order } from './pages/order/order';
import { Register } from './core/pages/register/register';
import { Login } from './core/pages/login/login';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'products',
    component: Products,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'brands',
    component: Brands,
  },
  {
    path: 'categories',
    component: Categories,
  },
  {
    path: 'checkout',
    component: Checkout,
  },
  {
    path: 'order',
    component: Order,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    component: NotFound,
  },
];
