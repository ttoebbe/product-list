import { Routes } from '@angular/router';
import { ProductDetail } from './shared/components/product-detail/product-detail';
import { ProductList } from './shared/components/product-list/product-list';
import { ProductForm } from './shared/components/product-form/product-form';

export const routes: Routes = [
  { path: '', component: ProductList }, //rootebene
  { path: 'detail/:name', component: ProductDetail }, //rootebene
  { path: 'productform', component: ProductForm }, //rootebene
  { path: 'productform/:name', component: ProductForm }, //rootebene
];
