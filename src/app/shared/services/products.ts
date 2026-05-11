import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class Products {
  supabase = createClient(
    'https://izyiiuukuuxhawkptkat.supabase.co',
    'sb_publishable_SBcuJI_mU4JEg40-LimfUA_Zrrny2rP',
  );

  productlist = signal<Product[]>([]);

  productdetail = signal<Product>({
    id: 0,
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
  });

  addProduct(product: Product) {
    this.productlist.update((list) => [...list, product]);
  }

  updateProduct(name: string, updated: Product): void {
    this.productlist.update((list) => list.map((p) => (p.name === name ? updated : p)));
  }

  setProductDetailByName(name: string) {
    let tmpProduct = this.productlist().find((product) => product.name === name);
    if (tmpProduct) {
      this.productdetail.set(tmpProduct);
    }
    // setTimeout(() => {
    //   this.productdetail.update((product) => ({ ...product, description: 'banana' }));
    // }, 2000);
  }

  setProductDetailById(id: number) {
    let tmpProduct = this.productlist().find((product) => product.id == id);
    if (tmpProduct) {
      this.productdetail.set(tmpProduct);
    }
  }

  async getAllProducts() {
    let response = await this.supabase.from('products').select('*');
    console.log(response.data);

    this.productlist.set((response.data ?? []) as Product[]);
  }

  constructor() {
    this.getAllProducts();
  }
}
