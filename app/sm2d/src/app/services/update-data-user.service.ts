import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { map } from "rxjs/Operators";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { resolve } from "url";
import { ToastController } from "@ionic/angular";
import { Card } from "../models/tarjeta";


@Injectable({
    providedIn: "root"
})
export class UpdateDataUserService {

    // Variables privadas tarjeta de credito.
    private cardCreditCollection: AngularFirestoreCollection<Card>;
    private cardCredit: Observable<Card[]>; 
    private card: AngularFirestoreDocument<Card>

    constructor(
        private afauth: AngularFireAuth,
        private afsc: AngularFirestore,
        private toast: ToastController
    ) {}
    
    async updateOk() {
        const toast = await this.toast.create({
            message: "Actualizacion correcta",
            duration: 2000
        });
        toast.present();
    }

    async updateError() {
        const toast = await this.toast.create({
            message: "Error al actualizar",
            duration: 4000
        });
        toast.present();
    }

    // Traer datos del usuario activo
    getUser(): Observable<any>{
        return this.afauth.authState.pipe(map(auth => auth));
    }

    updateNameUser(name: string): any {
        const user = this.afauth.auth.currentUser;
        return new Promise((resolve, reject) => {
            user.updateProfile({
                displayName: name
            })
                .then(data => {
                    console.log(
                        "Actualizacion del nombre del usuario correcta ",
                        user
                    );
                    resolve();
                    this.updateOk();
                })
                .catch(error => {
                    reject(error);
                    console.log(
                        "Error al actualizar el nombre del usuario ",
                        error
                    );
                    this.updateError();
                });
        });
    }

    updateEmail(email: string) {
        console.log(email)
        const user = this.afauth.auth.currentUser;
        return new Promise((resolve, reject) => {
                user.updateEmail(email).then(() => {
                    this.updateOk();
                }).catch(() => {
                    this.updateError();
                })
        });
    }

    updatePassword(password: string) {
        const user = this.afauth.auth.currentUser;
        return new Promise((resolve, reject) => {
            user.updatePassword(password)
                .then(() => {
                    this.updateOk();
                })
                .catch(() => {
                    this.updateError();
                });
        });
    }

    createNewCard(uid, number){
        let data: Card = {
            uid: uid,
            card: number
        }
        this.cardCreditCollection = this.afsc.collection<Card>('tarjeta');
        this.cardCredit = this.cardCreditCollection.valueChanges();
        this.cardCreditCollection.add(data).then(() => {
            this.updateOk();
        }).catch((error) => {
            console.log(error);
            this.updateError();
        })

    }
}
