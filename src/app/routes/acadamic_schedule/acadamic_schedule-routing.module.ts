import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcadamicLayoutComponent } from './acadamic-layout/acadamic-layout.component';
import { FirstYearComponent } from './first-year/first-year.component';
import { SecondYearComponent } from './second-year/second-year.component';
import { PrefinalYearComponent } from './prefinal-year/prefinal-year.component';
import { FinalYearComponent } from './final-year/final-year.component';



const routes: Routes = [
  {
    path: '',
    component: AcadamicLayoutComponent,
    children: [
      { path: '', redirectTo: 'first_year', pathMatch: 'full' },
      {
        path: 'first_year',
        component: FirstYearComponent,
        data: { title: 'First-year' },
      },
      {
        path: 'second_year',
        component: SecondYearComponent,
        data: { title: 'Second-Year' },
      },
      {
        path: 'prefinal_year',
        component: PrefinalYearComponent,
        data: { title: 'Prefinal-Year' },
      },
      {
        path: 'final_year',
        component: FinalYearComponent,
        data: { title: 'Final-Year' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Acadamic_scheduleRoutingModule {}
