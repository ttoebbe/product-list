import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  productService = inject(Products);

  ngOnInit() {
    const currentName = this.route.snapshot.paramMap.get('name');
    if (currentName) this.productService.setProductDetailByName(currentName);
    this.detail = this.productService.productdetail;
  }

  detail = {
    name: 'Gaming Maus',
    description:
      'Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.',
    specs: 'dpi: 6400, cable length: 1.8m, color: Schwarz',
    stock: 120,
    price: 2500000,
    addedAt: new Date('2024-01-15'),
  };

  deleteDetail() {
    this.detail.name = '';
  }
}
