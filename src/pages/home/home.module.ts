import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { CalendarComponentModule } from '../../components/calendar/calendar.module'

@NgModule({
  declarations: [HomePage],
  imports: 
    [
      CalendarComponentModule, 
      IonicPageModule.forChild(HomePage)
    ],
})
export class HomePModule { }