import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadProductsPage } from './upload-products.page';

const routes: Routes = [
  {
    path: '',
    component: UploadProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadProductsPageRoutingModule {}
