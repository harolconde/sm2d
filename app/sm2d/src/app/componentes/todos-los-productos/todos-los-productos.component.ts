import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-todos-los-productos',
  templateUrl: './todos-los-productos.component.html',
  styleUrls: ['./todos-los-productos.component.scss'],
})
export class TodosLosProductosComponent implements OnInit {

  public filterPost = '';
  public allProductos: Array<Producto> = [];
  constructor(private producto: ProductsService) { }

  ngOnInit() {
    this.getAllProductsExist();
    this.producto.getLoading();
  }

  getAllProductsExist(){
    this.producto.getAllProducts().subscribe(data => {
      this.allProductos = data;
      this.producto.stopLoading();
    })
  }

}
