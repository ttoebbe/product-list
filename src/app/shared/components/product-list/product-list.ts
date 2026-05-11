import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  productService = inject(Products);
  router = inject(Router);
  list = this.productService.productlist;

  onEditProduct(event: MouseEvent, name: string): void {
    event.stopPropagation();
    this.router.navigate(['/productform', name]);
  }
}
