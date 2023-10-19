import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'sales', pathMatch: 'full'},
      // {
      //   path: 'sales',
      //   component: SalesComponent,
      //   data: { title: 'Sales', titleI18n: 'sales' },
      // },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      // {
      //   path: 'menu',
      //   component: MainComponent,
      //   data: { title: 'Menu', titleI18n: 'menu' },
      // },
      {
        path: 'acadamic_schedule',
        loadChildren: () => import('./acadamic_schedule/acadamic_schedule.module').then(m => m.Acadamic_scheduleModule),
        data: { title: 'Acadamic_Schedule', titleI18n: 'acadamic_schedule'},
      },
      {
        path: 'cat_analysis',
        loadChildren: () => import('./cat_analysis/cat_analysis.module').then(m => m.Cat_Analysis_scheduleModule),
        data: { title: 'Cat_Analysis', titleI18n: 'cat_analysis'},
      },
      {
        path: 'esem_analysis',
        loadChildren: () => import('./E_sem_analysis/esem_analysis.module').then(m => m.Esem_analysis_scheduleModule),
        data: { title: 'Esem_analysis', titleI18n: 'esem_analysis'},
      },
      // {
      //   path: 'settings',
      //   component: SettingComponent,
      //   data: { title: 'Settings', titleI18n: 'settings' },
      // },
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
