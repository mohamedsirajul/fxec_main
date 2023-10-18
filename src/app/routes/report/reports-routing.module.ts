import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsLayoutComponent } from './reports-layout/reports-layout.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { ProductReportComponent } from './product-report/product-report.component';


const routes: Routes = [
  {
    path: '',
    component: ReportsLayoutComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'sales_report',
        component: SalesReportComponent,
        data: { title: 'Sales-Report' },
      },
      {
        path: 'product_report',
        component: ProductReportComponent,
        data: { title: 'Product-Report' },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
