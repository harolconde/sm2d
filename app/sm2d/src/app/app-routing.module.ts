import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { ProductoDetalleComponent } from './componentes/producto-detalle/producto-detalle.component';
import { from } from 'rxjs';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { TodosLosProductosComponent } from './componentes/todos-los-productos/todos-los-productos.component';

const routes: Routes = [
  {
    path: 'foder',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path:'registro',
    component: RegistroComponent,
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path:'editar-perfil',
    component: EditarUsuarioComponent
  },
  {
    path: 'upload-products',
    loadChildren: () => import('./pages/upload-products/upload-products.module').then( m => m.UploadProductsPageModule)
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
