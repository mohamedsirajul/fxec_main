import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Esem_analysisRoutingModule } from './esem_analysis-routing.module';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';
import { EsemLayoutComponent } from './esem-layout/esem-layout.component';






const COMPONENTS = [
  OddComponent, 
  EvenComponent, 
  EsemLayoutComponent,
];

const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, Esem_analysisRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC,],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class Esem_analysis_scheduleModule {}
