import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarComponent } from './calendar';

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    IonicPageModule.forChild(CalendarComponent),
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarComponentModule {}
