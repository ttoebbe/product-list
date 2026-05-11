import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  productService = inject(Products);

  ngOnInit() {
    const currentid = Number(this.route.snapshot.paramMap.get('id'));
    if (currentid) this.productService.setProductDetailById(currentid);
  }

  detail = this.productService.productdetail;

  deleteDetail() {
    // this.detail.name = '';
  }
}
