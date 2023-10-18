import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { SettingComponent } from './setting/setting.component';
import { SalesComponent } from './sales/sales/sales.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './menu/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'sales', pathMatch: 'full'},
      {
        path: 'sales',
        component: SalesComponent,
        data: { title: 'Sales', titleI18n: 'sales' },
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'menu',
        component: MainComponent,
        data: { title: 'Menu', titleI18n: 'menu' },
      },
      {
        path: 'reports',
        loadChildren: () => import('./report/reports.module').then(m => m.ReportModule),
        data: { title: 'Reports', titleI18n: 'reports'},
      },
      {
        path: 'settings',
        component: SettingComponent,
        data: { title: 'Settings', titleI18n: 'settings' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
