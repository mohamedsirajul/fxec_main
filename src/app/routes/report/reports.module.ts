import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';

import { ReportsLayoutComponent } from './reports-layout/reports-layout.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { ProductReportComponent } from './product-report/product-report.component';



const COMPONENTS = [
  ReportsLayoutComponent,
  SalesReportComponent,
  ProductReportComponent
];

const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, ReportsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class ReportModule {}
