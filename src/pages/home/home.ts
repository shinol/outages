import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { CalendarComponent } from '../../components/calendar/calendar';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(CalendarComponent) content: CalendarComponent;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    this.content.goCurrent();
  }

}
