import { Component } from '@angular/core';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent {

  telemetry: string = "nothing yet";
  isoDate: string = (new Date()).toISOString();
  changedDate: Date;
  weeks: Object[][] = this.buildDays(new Date);

  constructor() {

  }

  ionViewDidLoad(){

  };

  goBack() {
    this.changedDate.setMonth(this.changedDate.getMonth()-1);
    this.isoDate = this.changedDate.toISOString();
    this.weeks = this.buildDays(this.changedDate);
  }

  goForward() {
    this.changedDate.setMonth(this.changedDate.getMonth()+1);
    this.isoDate = this.changedDate.toISOString();
    this.weeks = this.buildDays(this.changedDate);
  }

  dateChange(e) {

    var selectedDate = new Date(e.year, e.month-1, 1);
    this.weeks = this.buildDays(selectedDate);

  }

  buildDays(theDate: Date): Object[][] {
    this.changedDate = new Date(theDate.getFullYear(), theDate.getMonth(), 1);
    var daysInMonth: number = new Date(theDate.getFullYear(), theDate.getMonth()+1, 0).getDate();
    var daysInPriorMonth: number = new Date(theDate.getFullYear(), theDate.getMonth(), 0).getDate();

    var daysArray: Object[][] = [];
    var numDay = 1; // counter to tell when weeks are over
    var firstWeek = true;
    var lastWeek = 1;

    while(numDay <= daysInMonth) {
      var tmpWeek: Object[] = [];
      for (var i= 0; i <= 6; i++) {
        if (firstWeek && i < this.changedDate.getUTCDay()) {
          var firstOne = daysInPriorMonth - this.changedDate.getUTCDay() + i + 1;
          tmpWeek.push({lighten: true, day: firstOne.toString()});
        } else {
          if (numDay > daysInMonth) {
            tmpWeek.push({lighten: true, day: (lastWeek++).toString()});
          } else {
            tmpWeek.push({lighten: false, day: numDay.toString()});
            numDay++;
            firstWeek = false;
          }
        }
      }
      daysArray.push(tmpWeek);
    }
    return daysArray;
  }

  onSwipe(e) {
    // deltaX > 0 when swiping right
    // deltaX < 0 when swiping left
    if (e.deltaX > 0) {
      this.goBack();
    } else {
      this.goForward();
    }
  }

  boom(i) {
    this.telemetry = "Pressed >  " + i.day + " , " + i.lighten;
  }

}
