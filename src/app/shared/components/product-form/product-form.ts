import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Products } from '../../services/products';
import { Product } from '../../interfaces/product';
import { ProductModel } from '../../models/productmodel';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  productService = inject(Products);

  isEditMode = false;
  private originalName = '';

  productForm = new FormGroup({
    name: new FormControl('', {nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    price: new FormControl(0.0, {nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    description: new FormControl('', {nonNullable: true}),
    specs: new FormControl('', {nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    stock: new FormControl(0, {nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (!name) return;

    this.isEditMode = true;
    this.originalName = name;

    const product = this.productService.productlist().find((p) => p.name === name);
    if (product) {
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        description: product.description,
        specs: product.specs,
        stock: product.stock,
      });
    }
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const original = this.productService.productlist().find((p) => p.name === this.originalName);

    // const product: Product = {
    //   name: this.productForm.value.name ?? '',
    //   description: this.productForm.value.description ?? '',
    //   specs: this.productForm.value.specs ?? '',
    //   stock: this.productForm.value.stock ?? 0,
    //   price: this.productForm.value.price ?? 0,
    //   addedAt: this.isEditMode ? (original?.addedAt ?? new Date()) : new Date(),
    // };
    let product = new ProductModel(this.productForm.value);


    if (this.isEditMode) {
      this.productService.updateProduct(this.originalName, product);
    } else {
      this.productService.addProduct(product);
    }

    this.router.navigate(['/']);
  }
}
