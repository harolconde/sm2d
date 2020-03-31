import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { resolve } from "url";
import { LoadingController } from "@ionic/angular";

@Injectable({
    providedIn: "root"
})
export class LoginRegisterService {
    public datos: boolean;
    public formulario: any;
    public user = firebase.auth().currentUser;
    constructor(private afauth: AngularFireAuth, private router: Router, private loading: LoadingController) {}

    public loader = this.loading.create({ message: 'Cargando datos...'});

    // iniciar loading
    async getLoading(){
        await (await this.loader).present();
    }

    // Parar loading
    async stopLoading(){
        await (await this.loader).dismiss();
    }
    
    // Observador session activa
    async getSesionActive(){
        return await new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    resolve(this.formulario = false);
                    console.log(user.displayName);
                } else {
                    reject(this.formulario = true);
                   
                }
            })
        }).then(() => {
            this.router.navigate(["/dashboard"]);
        }).catch(() => {
            console.log('Formulario servicio '+ this.formulario)
            console.log('Ningun usuario activo');
        })
        
    }

    // Registrar un nuevo usuario
    registerUser(name: string, email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afauth.auth
                .createUserWithEmailAndPassword(email, password)
                .then(data => {
                    console.log("Nuevo usuario registrado: ", data);
                    resolve(data);
                    this.updateNameUser(name);
                })
                .catch(error => {
                    console.log("Error al registrar el usuario: ", error);
                    reject(error);
                });
        });
    }

    // Actualizar nombre del usuario
    updateNameUser(name: string): any {
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

    // Autenticacion de un nuevo usuario.
    isAuth(email: string, password: any) {
        return new Promise((resolve, reject) => {
            this.afauth.auth
                .signInWithEmailAndPassword(email, password)
                .then(data => {
                    console.log("Inicio de session correcto");
                    console.log(data);
                    resolve(data);
                    console.log(this.user);
                    this.datos = false;
                    this.router.navigate(["/dashboard"]);
                })
                .catch(error => {
                    console.log("Datos incorrectos");
                    console.log(error);
                    reject(error);
                    this.datos = true;
                });
        });
    }

    // Cerrar sesión de usuario
    isLogout() {
        const user = this.afauth.auth
            .signOut()
            .then(() => {
                this.router.navigate(["/iniciar-sesion"]);
            })
            .catch( (error) => {
                console.log('Error al cerrar la secion: ', error);
            });
    }
}
