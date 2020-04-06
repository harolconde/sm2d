import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Observable } from "rxjs";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
    public cantPrd: number = 0;
    public allProductCart: Array<any> = [];
    public presupuesto:number = 0;
    public formPresupuesto = new FormGroup({
        presupuesto: new FormControl("", Validators.required)
    })
    constructor(private producto: ProductsService) {}
    
    ngOnInit() {
        this.addNumbrerToCart();
        setInterval(() => {
            console.log('Presupuesto');
            this.presupuesto = this.producto.getPresupuesto();
        }, 300);
        //this.getPresupuesto();
    }

    addNumbrerToCart() {
        this.allProductCart = this.producto.getCantProductsCartSesion();
        for(let i = 0; i < this.allProductCart.length; i++){
            console.log(this.allProductCart[i].cantidad);
            this.cantPrd = this.cantPrd + this.allProductCart[i].cantidad;
        }
    }

    getValuePresupuesto(){
        const presupuestoTotal = this.formPresupuesto.get('presupuesto').value;
        this.producto.presupuesto = presupuestoTotal;
        this.reset();
        this.presupuesto = this.producto.getPresupuesto();
    }

    // Reset
    reset(){
        this.formPresupuesto.reset();
    }
}
