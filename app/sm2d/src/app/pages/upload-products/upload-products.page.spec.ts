import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadProductsPage } from './upload-products.page';

describe('UploadProductsPage', () => {
  let component: UploadProductsPage;
  let fixture: ComponentFixture<UploadProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
