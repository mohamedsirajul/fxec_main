import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatLayoutComponent } from './cat-layout/cat-layout.component';
import { CatOneComponent } from './cat-one/cat-one.component';
import { CatTwoComponent } from './cat-two/cat-two.component';




const routes: Routes = [
  {
    path: '',
    component: CatLayoutComponent,
    children: [
      { path: '', redirectTo: 'cat1', pathMatch: 'full' },
      {
        path: 'cat1',
        component: CatOneComponent,
        data: { title: 'Cat-1' },
      },
      {
        path: 'cat2',
        component: CatTwoComponent,
        data: { title: 'Cat-2' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cat_analysisRoutingModule {}
