import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, numberAttribute } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(Products);

  ngOnInit() {
    const currentid = Number(this.route.snapshot.paramMap.get('id'));
    if (currentid) this.productService.setProductDetailById(currentid);
  }

  detail = this.productService.productdetail;

  async deleteDetail() {
   this.productService.deleteProduct(this.detail().id);
    
    this.router.navigate(['']);
  }
}
