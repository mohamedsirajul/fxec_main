import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsemLayoutComponent } from './esem-layout/esem-layout.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';




const routes: Routes = [
  {
    path: '',
    component: EsemLayoutComponent,
    children: [
      { path: '', redirectTo: 'odd', pathMatch: 'full' },
      {
        path: 'odd',
        component: OddComponent,
        data: { title: 'Odd' },
      },
      {
        path: 'even',
        component: EvenComponent,
        data: { title: 'Even' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Esem_analysisRoutingModule {}
