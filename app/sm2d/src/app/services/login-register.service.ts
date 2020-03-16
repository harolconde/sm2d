import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import * as Firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { resolve } from "url";

@Injectable({
    providedIn: "root"
})
export class LoginRegisterService {
    constructor(private afauth: AngularFireAuth, private router: Router) {}

    // Registrar un nuevo usuario
    registerUser(name: string, email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afauth.auth
                .createUserWithEmailAndPassword(email, password)
                .then(data => {
                    console.log("Nuevo usuario registrado: ", data);
                    resolve(data);
                })
                .catch(error => {
                    console.log("Error al registrar el usuario: ", error);
                    reject(error);
                });
        });
    }

    // Actualizar nombre del usuario
    updateNameUser(name: string): any{
        const user = this.afauth.auth.currentUser;
        return new Promise((resolve, reject) => {
            user.updateProfile({
                displayName: name
            })
                .then(data => {
                    console.log("Nuevo registro exitoso: ");
                    console.log(data);
                    //resolve(data);
                })
                .catch(error => {
                    console.log("Error al registrar nuevo usuario: ");
                    console.log(error);
                    reject(error);
                });
        });
    }

    // Autenticar via email
    authEmail(): any {
        const user = this.afauth.auth.currentUser;
        return new Promise((resolve, reject) => {
            user.sendEmailVerification()
                .then(data => {
                    console.log("Enviando mensaje...");
                    console.log(data);
                    // resolve(data);
                })
                .catch(error => {
                    console.log("Error al autenticar el email: ", error);
                    reject(error);
                });
        });
    }
}
