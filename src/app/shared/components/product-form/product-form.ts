import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  productForm = new FormGroup({
    name: new FormControl('n/a', {validators: [Validators.required, Validators.minLength(3)]}),
    price: new FormControl(0.00, {validators: [Validators.required, Validators.min(0)]}),
    description: new FormControl('n/a',),
    // specs: new FormControl('n/a', {validators: [Validators.required]}),
    stock: new FormControl(0, {validators: [Validators.required, Validators.min(0)]}),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.productForm.value);
  }

}
