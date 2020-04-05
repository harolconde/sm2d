import { Injectable } from "@angular/core";
import { Producto } from "../models/producto";
import { LoadingController } from "@ionic/angular";
import { Observable, from, pipe } from "rxjs";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { map } from 'rxjs/Operators';

@Injectable({
    providedIn: "root",
})
export class ProductsService {
    // Variables privadas productos
    private productosCollection: AngularFirestoreCollection<Producto>;
    private produtos: Observable<Producto[]>;
    private productosDoc: AngularFirestoreDocument<Producto>;
    private producto: Observable<Producto>;

    constructor(
        private loading: LoadingController,
        private afs: AngularFirestore,
        private toast: ToastController
    ) {}
    public loader = this.loading.create({ message: "Cargando datos..." });

    // iniciar loading
    async getLoading() {
        await (await this.loader).present();
    }

    // Parar loading
    async stopLoading() {
        await (await this.loader).dismiss();
    }

    async productoOk() {
        const toast = await this.toast.create({
            message: "Producto creado con exito",
            duration: 2000,
        });
        toast.present();
    }

    async productoError() {
        const toast = await this.toast.create({
            message: "Error al crear el producto",
            duration: 4000,
        });
        toast.present();
    }

    postProducts(producto: Producto) {
        console.log(producto);
        this.productosCollection = this.afs.collection<Producto>("producto");
        this.produtos = this.productosCollection.valueChanges();
        this.productosCollection.add(producto).then(() => {
            this.productoOk();
        }).catch(() => {
            this.productoError();
        });
    }

    getAllProducts(){
        this.productosCollection = this.afs.collection<Producto>("producto");
        this.produtos = this.productosCollection.valueChanges();
        return this.produtos = this.productosCollection.snapshotChanges().pipe(map( changes => {
            return changes.map(action => {
                const data = action.payload.doc.data() as Producto;
                data.id = action.payload.doc.id;
                return data;
            });
        }))
    }
}
