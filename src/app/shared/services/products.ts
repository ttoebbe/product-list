import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { createClient } from '@supabase/supabase-js';
import { ProductModel } from '../models/productmodel';

@Injectable({
  providedIn: 'root',
})
export class Products {
  supabase = createClient(
    'https://izyiiuukuuxhawkptkat.supabase.co',
    'sb_publishable_SBcuJI_mU4JEg40-LimfUA_Zrrny2rP',
  );

  productlistInsertChannel;
  productlistDeleteChannel;

  productlist = signal<Product[]>([]);

  productdetail = signal<Product>({
    id: 0,
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
  });

  constructor() {
    this.getAllProducts();

    this.productlistInsertChannel = this.supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'products' },
        (payload) => {
          let tmpProduct = new ProductModel(payload.new);
          this.productlist.update((list) => [...list, tmpProduct]);
        },
      )
      .subscribe();

    this.productlistDeleteChannel = this.supabase
      .channel('custom-delete-channel')
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'products' },
        (payload) => {
          let tmpProductId = payload.old["id"]
          this.productlist.update(list => list.filter(product => product.id !== tmpProductId));
        },
      )

      .subscribe();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.supabase.removeChannel(this.productlistInsertChannel);
    this.supabase.removeChannel(this.productlistDeleteChannel);
  }

  async addProduct(product: ProductModel) {
    // console.log(product.getCleanAddJson());

    const product_data = product.getCleanAddJson();
    const { data, error } = await this.supabase.from('products').insert([product_data]).select();
  }

  updateProduct(name: string, updated: Product): void {
    this.productlist.update((list) => list.map((p) => (p.name === name ? updated : p)));
  }

  async deleteProduct(id: number) {
   const { error } = await this.supabase.from('products').delete().eq('id', id);
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
}
