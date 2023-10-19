import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Acadamic_scheduleRoutingModule } from './acadamic_schedule-routing.module';

import { AcadamicLayoutComponent } from './acadamic-layout/acadamic-layout.component';
import { FirstYearComponent } from './first-year/first-year.component';
import { SecondYearComponent } from './second-year/second-year.component';
import { PrefinalYearComponent } from './prefinal-year/prefinal-year.component';
import { FinalYearComponent } from './final-year/final-year.component';



const COMPONENTS = [
  AcadamicLayoutComponent,
  FirstYearComponent,
  SecondYearComponent,
  PrefinalYearComponent,
  FinalYearComponent
];

const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, Acadamic_scheduleRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class Acadamic_scheduleModule {}
