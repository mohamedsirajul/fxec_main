import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SettingComponent } from './setting/setting.component';
import { TableComponent } from './sales/table/table.component';
import { QuantityDialogComponent } from './sales/table/quantity-dialog/quantity-dialog.component';
import { MainComponent } from './menu/main/main.component';
import { DialogBoxComponent } from './menu/dialog-box/dialog-box.component';
import { AddProductBoxComponent } from './menu/add-product-box/add-product-box.component';
import { SalesComponent } from './sales/sales/sales.component';




const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule,],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, SettingComponent, TableComponent, QuantityDialogComponent,MainComponent, DialogBoxComponent, AddProductBoxComponent, SalesComponent ],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class RoutesModule {}
