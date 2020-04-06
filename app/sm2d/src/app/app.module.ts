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
import { ProductoDetalleComponent } from './componentes/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';

import { from } from "rxjs";
import { LoginComponent } from './componentes/login/login.component';
import { TodosLosProductosComponent } from './componentes/todos-los-productos/todos-los-productos.component';
import { PipeFilterPipe } from './pipes/pipe-filter.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, RegistroComponent, LoginComponent, EditarUsuarioComponent, ProductoDetalleComponent, CarritoComponent, TodosLosProductosComponent, PipeFilterPipe, FilterPipe],
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
            },
            {
                path: 'producto/:id',
                component: ProductoDetalleComponent
            },
            {
                path: 'carrito',
                component: CarritoComponent
            },
            {
                path: 'productos-todos',
                component: TodosLosProductosComponent
            }
        ]),
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        FormsModule
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
