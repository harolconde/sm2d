import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UpdateDataUserService } from "../../services/update-data-user.service";
import { ToastController } from "@ionic/angular";
import { resolve } from 'url';
import { async } from '@angular/core/testing';

@Component({
    selector: "app-editar-usuario",
    templateUrl: "./editar-usuario.component.html",
    styleUrls: ["./editar-usuario.component.scss"]
})
export class EditarUsuarioComponent implements OnInit {
    public idUser: string;
    public editarNombre:boolean = false;
    public editarDatosUsuario:boolean = false;
    public editarTarjeta:boolean = false;
    public formUdpateName = new FormGroup({
        name: new FormControl("", Validators.required)
    });
    public formUpdateDataUser = new FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
    });
    public formAddCreditCard = new FormGroup({
        card: new FormControl("", Validators.required)
    });
    constructor(private upd: UpdateDataUserService, private toast: ToastController) {}

    ngOnInit() {
        this.getDataUser();
    }

    async registerUserOk() {
        const toast = await this.toast.create({
            message: "Actualizacion correcta",
            duration: 2000
        });
        toast.present();
    }

    async registerUserError() {
        const toast = await this.toast.create({
            message: "Error al actualizar",
            duration: 4000
        });
        toast.present();
    }

    async showForm() {
        this.editarNombre = ! this.editarNombre;
        await this.editarNombre;
    }
    async showFormDataUser() {
        this.editarDatosUsuario = ! this.editarDatosUsuario;
        await this.editarNombre;
    }
    async showFormTarjeta() {
        this.editarTarjeta = ! this.editarTarjeta;
        await this.editarNombre;
    }

    // Mostrar datos del usuario con la sesion activa
    getDataUser(){
        this.upd.getUser().subscribe(data => {
            console.log(data);
            this.idUser = data.uid;
            console.log(this.idUser);
        });
    }

    // Actualizar nombre del usuario
    updateName(){
        const name = this.formUdpateName.get('name').value;
        this.upd.updateNameUser(name);
    }

    // Actualizar correo y contraseña de usuario
    updateDataUser(){
        const email = this.formUpdateDataUser.get('email').value;
        const password = this.formUpdateDataUser.get('password').value;
        if(email != "" && password == ""){
            this.upd.updateEmail(email).then(() => {
                this.reset();
            })
        } else if(email == "" && password != ""){
            this.upd.updatePassword(password).then(() => {
                this.reset();
            })
        } else {
            this.registerUserError();
        }
    }

    registerTarget(){
        const tarjeta = this.formAddCreditCard.get('card').value;
        this.upd.createNewCard(this.idUser, tarjeta);
    }

    reset(){
        this.formUdpateName.reset();
        this.formUpdateDataUser.reset();
        this.formAddCreditCard.reset();
    }
}
