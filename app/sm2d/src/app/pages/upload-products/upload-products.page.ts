import { Component, OnInit } from "@angular/core";
import {
    FormGroup,
    FormControl,
    Validators,
    FormsModule,
} from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { from } from "rxjs";
import { ProductsService } from "../../services/products.service";
import { LoadingController } from "@ionic/angular";
import { Producto } from "src/app/models/producto";

@Component({
    selector: "app-upload-products",
    templateUrl: "./upload-products.page.html",
    styleUrls: ["./upload-products.page.scss"],
})
export class UploadProductsPage implements OnInit {
    public urlImage: Observable<string>;
    public uploadPercent: Observable<number>;
    public spinner: boolean = false;
    public formProducts = new FormGroup({
        nombre: new FormControl("", Validators.required),
        precio: new FormControl("", Validators.required),
        marca: new FormControl("", Validators.required),
        gramaje: new FormControl("", Validators.required),
        stock: new FormControl("", Validators.required),
    });
    constructor(
        private storage: AngularFireStorage,
        private producto: ProductsService,
        private loading: LoadingController
    ) {}

    ngOnInit() {}

    public loader = this.loading.create({ message: "Cargando datos..." });

    // iniciar loading
    async getLoading() {
        await (await this.loader).present();
    }

    // Parar loading
    async stopLoading() {
        await (await this.loader).dismiss();
    }

    // Metodo para subir imagenes
    uploadImg(e: any): void {
        this.spinner = true;
        const id = Math.random().toString(36).substring(2); // Creamos un id unico para el producto
        const file = e.target.files[0];
        const filePath = `productos/${id}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges()
            .pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe((data) => {
                        console.log(data);
                        this.urlImage = data;
                        this.urlFull();
                        this.spinner = false;
                    });
                })
            )
            .subscribe();
    }

    urlFull() {
        this.uploadPercent.subscribe((data) => {
            console.log(data);
            if (data == 100) {
                this.spinner = false;
            }
        });
    }

    createProduct() {
        const nombre = this.formProducts.get("nombre").value;
        const precio = this.formProducts.get("precio").value;
        const marca = this.formProducts.get("marca").value;
        const gramaje = this.formProducts.get("gramaje").value;
        const stock = this.formProducts.get("stock").value;
        let newProducto: Producto = {
            img: this.urlImage,
            nombre: nombre,
            precio: precio,
            marca: marca,
            gramaje: gramaje,
            stock: stock,
        };
        this.producto.postProducts(newProducto);
        setTimeout(() => {
            this.reset();
        }, 300);
    }
    reset(){
        return this.formProducts.reset();
    }
}
