import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";

@Component({
    selector: "app-productos-carrito",
    templateUrl: "./productos-carrito.component.html",
    styleUrls: ["./productos-carrito.component.scss"],
})
export class ProductosCarritoComponent implements OnInit {
    public productosCarrito: Array<any> = [];
    public slideOpts = {
        slidesPerView: 6, // Slides por vista
        spaceBetween: 0, // Espacio entre slides
        speed: 400, // Velocidad del slide
        centeredSlide: true, // Centrar el slide
    };
    constructor(private producto: ProductsService) {}

    ngOnInit() {
        this.getProductsCart();
    }

    getProductsCart(){
        this.productosCarrito = this.producto.getCantProductsCartSesion();
        console.log(this.productosCarrito);
    }


}
