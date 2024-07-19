import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AcadamicScheduleComponent } from './acadamic-schedule/acadamic-schedule.component';




const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule,],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, AcadamicScheduleComponent ],
  entryComponents: COMPONENTS_DYNAMIC,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class RoutesModule {}
