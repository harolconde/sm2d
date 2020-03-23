import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginRegisterService } from "../../services/login-register.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    public message: boolean;
    public formLogin = new FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
    });
    constructor(private login: LoginRegisterService) {}

    ngOnInit() {}

    loginUser() {
        let user = this.formLogin.get("email").value;
        let pass = this.formLogin.get("password").value;
        this.login
            .isAuth(user, pass)
            .then(() => {
              this.message = false;
              this.reset();
            })
            .catch(() => {
              this.message = true;
            });
    }
    
    reset(){
      this.formLogin.reset();
    }
}
