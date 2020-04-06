import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ProductosComponent } from '../../componentes/productos/productos.component';
import { from } from 'rxjs';
import { ProductosCarritoComponent } from '../../componentes/productos-carrito/productos-carrito.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DashboardPage, ProductosComponent, ProductosCarritoComponent]
})
export class DashboardPageModule {}
