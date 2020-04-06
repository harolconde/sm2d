import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
@Component({
    selector: "app-carrito",
    templateUrl: "./carrito.component.html",
    styleUrls: ["./carrito.component.scss"],
})
export class CarritoComponent implements OnInit {
    public total:number = 0;
    public productosCart: Array<any> = [];
    constructor(private producto: ProductsService) {}

    ngOnInit() {
        this.getProductsToCart();
    }

    getProductsToCart() {

        this.productosCart = this.producto.getCantProductsCartSesion();
        for (let i = 0; i < this.productosCart.length; i++) {
            console.log(this.productosCart[i].precio);
            this.total += this.productosCart[i].precio;
        }
    }
}
