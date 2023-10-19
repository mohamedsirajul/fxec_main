import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Cat_analysisRoutingModule } from './cat_analysis-routing.module';
import { CatLayoutComponent } from './cat-layout/cat-layout.component';
import { CatOneComponent } from './cat-one/cat-one.component';
import { CatTwoComponent } from './cat-two/cat-two.component';





const COMPONENTS = [
  CatLayoutComponent,
  CatOneComponent,
  CatTwoComponent
];

const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, Cat_analysisRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC,],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class Cat_Analysis_scheduleModule {}
