import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Producto } from "../../models/producto";

@Component({
    selector: "app-productos",
    templateUrl: "./productos.component.html",
    styleUrls: ["./productos.component.scss"],
})
export class ProductosComponent implements OnInit {
    public productos: Array<Producto> = [];
    public slideOpts = {
        slidesPerView: 1.3, // Slides por vista
        spaceBetween: 0, // Espacio entre slides
        speed: 400, // Velocidad del slide
        centeredSlide: true, // Centrar el slide
    };
    constructor(private producto: ProductsService) {}

    ngOnInit() {
        this.getProducts();
        this.producto.getLoading();
    }

    getProducts() {
        this.producto.getAllProducts().subscribe((data) => {
            this.productos = data;
            console.log(this.productos);
            this.producto.stopLoading();
        });
    }
}
