import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';

import { UploadProductsPageRoutingModule } from './upload-products-routing.module';

import { UploadProductsPage } from './upload-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadProductsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UploadProductsPage]
})
export class UploadProductsPageModule {}
