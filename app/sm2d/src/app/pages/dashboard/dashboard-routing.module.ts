import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { ProductosComponent } from '../../componentes/productos/productos.component';
import { ProductosCarritoComponent } from '../../componentes/productos-carrito/productos-carrito.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
