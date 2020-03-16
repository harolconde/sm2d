import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import {LoginRegisterService} from "../../services/login-register.service";
import { from } from "rxjs";

@Component({
    selector: "app-registro",
    templateUrl: "./registro.component.html",
    styleUrls: ["./registro.component.scss"]
})
export class RegistroComponent implements OnInit {

    public formRegister = new FormGroup({
        name: new FormControl("", Validators.required),
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
    })
    constructor( private toast: ToastController, private registerUser: LoginRegisterService) {}
    
    ngOnInit() {}

    async registerUserOk() {
        const toast = await this.toast.create({
            message: "Nuevo usuario registrado",
            duration: 2000
        });
        toast.present();
    }
    async registerUserError() {
        const toast = await this.toast.create({
            message: "Error al crear nuevo usuario",
            duration: 4000
        });
        toast.present();
    }

    register(){
        console.log('registro: ', this.formRegister.get('name').value);
        const name = this.formRegister.get('name').value;
        const email = this.formRegister.get('email').value;
        const password = this.formRegister.get('password').value;
        this.registerUser.registerUser(name, email, password).then(() => {
            this.registerUserOk();
            this.reset();
        })
        .catch(() => {
            this.registerUserError();
        })
    }

    reset() {
        this.formRegister.reset();
    }
}
