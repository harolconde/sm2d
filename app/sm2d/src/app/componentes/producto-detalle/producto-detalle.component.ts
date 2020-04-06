import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import { ProductosComponent } from "../productos/productos.component";
import { from } from "rxjs";
import { Producto } from "src/app/models/producto";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";

@Component({
    selector: "app-producto-detalle",
    templateUrl: "./producto-detalle.component.html",
    styleUrls: ["./producto-detalle.component.scss"],
})
export class ProductoDetalleComponent implements OnInit {
    public idProducto: string;
    public productos: any = {};
    public contador: number = 0;
    public indiceExistente: number;
    public productoCarrito = {
        id: "",
        imagen: "",
        nombre: "",
        precio: 0,
        cantidad: 0, 
    };
    public formAddCart = new FormGroup({
        cantidad: new FormControl("", Validators.required),
    });
    constructor(
        private route: ActivatedRoute,
        private producto: ProductsService,
        private toast: ToastController
    ) {}

    ngOnInit() {
        this.getIdProduct();
        this.producto.getLoading();
    }

    // Mostrar mensaje producto exito
    async productoOk() {
        const toast = await this.toast.create({
            message: "Producto creado con exito",
            duration: 2000,
        });
        toast.present();
    }

    // Mensaje de error adicionar productos al carrito
    async productoError() {
        const toast = await this.toast.create({
            message: "Debes comprar por lo menos una unidad de este producto",
            duration: 4000,
        });
        toast.present();
    }

    // Mensaje confirmación add producto existente
    async verifyProductExist() {
        const toast = await this.toast.create({
            message: "Ya tienes este producto en el carrito, quieres agregar mas?",
            position: "top",
            buttons: [
                {
                    text: "Cancelar",
                    role: "cancel",
                    handler: () => {
                       console.log('Cancelado');
                       this.reset();
                    },
                },
                {
                    side: "start",
                    text: "Si, agregar",
                    handler: () => {
                        this.producto.productsCart[this.indiceExistente].cantidad = this.producto.productsCart[this.indiceExistente].cantidad + this.productoCarrito.cantidad;
                        this.producto.productsCart[this.indiceExistente].precio = this.producto.productsCart[this.indiceExistente].precio + this.productoCarrito.precio;
                        this.reset();
                        this.producto.presupuesto = this.producto.presupuesto - this.productoCarrito.precio;
                    },
                },
            ],
        });
        toast.present();
    }
    // Obtener id del producto y asignarlo a this.idProducto
    getIdProduct() {
        this.idProducto = this.route.snapshot.paramMap.get("id");
        console.log(this.idProducto);
        this.getDataProducts(this.idProducto);
    }

    // Lanzar peticion al servicio para traer la informacion del producto con el id capturado anteriorment.
    getDataProducts(id) {
        this.producto.getOneProduct(id).subscribe((data) => {
            console.log(data);
            this.productos = data;
            this.producto.stopLoading();
        });
    }

    // Agregar cantidad de un producto
    contadorAdd() {
        return this.contador++;
    }

    // Restar cantidad de producto
    contadorMin() {
        this.contador--;
        if (this.contador < 0) {
            return (this.contador = 0);
        }
    }

    addProductToCart() {
        const cantidad = this.formAddCart.get("cantidad").value;
        console.log(cantidad);
        this.productoCarrito = {
            id: this.productos.id,
            imagen: this.productos.img,
            nombre: this.productos.nombre,
            precio: this.productos.precio * cantidad,
            cantidad: cantidad,
        };
        if (cantidad > 0) {
            if (this.producto.productsCart.length > 0) {
                console.log(this.producto.productsCart[0]);
                let indice = this.producto.productsCart.findIndex(
                    (idProd) => idProd.id === this.productoCarrito.id
                );
                console.log(indice);
                if (indice != -1) {
                    this.indiceExistente = indice;
                    console.log("Elemento Existe en el indice: ", indice);
                    this.verifyProductExist();
                } else {
                    this.producto.productsCart.push(this.productoCarrito);
                    
                    this.reset()
                    this.producto.presupuesto = this.producto.presupuesto - this.productoCarrito.precio;
                    this.sustraerPresupuesto();
                }
            } else {
                console.log("Primer producto creado");
                this.producto.productsCart.push(this.productoCarrito);
                this.reset()
                this.producto.presupuesto = this.producto.presupuesto - this.productoCarrito.precio;
            }
        } else {
            this.productoError();
        }
    }

    sustraerPresupuesto(){
        console.log(this.producto.presupuesto);
    }

    // Reset inputs cantidad
    reset(){
        return this.formAddCart.reset();
    }
}
