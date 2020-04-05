import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy, RouterModule } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ReactiveFormsModule } from "@angular/forms";
import { environment } from "../environments/environment";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RegistroComponent } from "./componentes/registro/registro.component";
import { EditarUsuarioComponent } from "./componentes/editar-usuario/editar-usuario.component";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { from } from "rxjs";
import { LoginComponent } from './componentes/login/login.component';

@NgModule({
    declarations: [AppComponent, RegistroComponent, LoginComponent, EditarUsuarioComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        RouterModule.forChild([
            {
                path: "registro",
                component: RegistroComponent
            },
            {
                path:'iniciar-sesion',
                component: LoginComponent
            },
            {
                path: 'editar-perfil',
                component: EditarUsuarioComponent
            }
        ]),
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AngularFireAuth,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
