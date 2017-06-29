import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { Card } from '../../types/Card';

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

  @ViewChild(Content) grid: Content;

  telemetry: string = "nothing yet";

  numCards: number = 3;
  cards: Card[] = this.buildCards(3, new Date());
  currentCardIndex: number = 0;  //default to second card

  constructor() {}

  goBackISay(clickedCard: Card) {
    var numCards: number = this.cards.length;
    var card: Card = this.cards.pop();

    card.changedDate.setMonth(card.changedDate.getMonth()-numCards+1);
    card.isoDate = card.changedDate.toISOString();
    card.weeks = this.buildDays(card.changedDate);

    this.cards.unshift(card);
  }

  goCurrent() {
    let element = document.getElementById('current');
    this.grid.scrollTo(0, element.offsetTop, 500);
  }

  goForwardISay(clickedCard: Card) {
    var numCards: number = this.cards.length;
    var card: Card = this.cards.shift();

    clickedCard.currentCard = 'not';

    card.changedDate.setMonth(card.changedDate.getMonth()+numCards-1);
    card.isoDate = card.changedDate.toISOString();
    card.weeks = this.buildDays(card.changedDate);
    card.currentCard = 'current';

    this.cards.push(card);
    this.goCurrent();
  }

  dateChange(e) {

    var selectedDate = new Date(e.year, e.month-1, 1);
    this.cards = this.buildCards(this.numCards, selectedDate);

  }

  buildCards(numCards: number, theDate: Date) {

    var cards: Card[] = [];
    var current: Date = theDate;
    var currentCard = '';
    
    current.setMonth(current.getMonth()-1); // first card 
    for (var i=0; i<numCards; i++)  {
      cards.push({
        isoDate: current.toISOString(),
        changedDate: new Date(current.toISOString()),
        weeks: this.buildDays(current),
        currentCard: 'not'
      });
      current.setMonth(current.getMonth()+1);
      if (i == Math.floor(numCards/2)) {this.setCurrentCard(i)};
    }


    return cards;

  }

  setCurrentCard(theCurrent: number) {
    this.cards[this.currentCardIndex].currentCard = "not";
    this.currentCardIndex = theCurrent;
    this.cards[this.currentCardIndex].currentCard = "current";
  }

  buildDays(theDate: Date): Object[][] {
    var changedDate = new Date(theDate.getFullYear(), theDate.getMonth(), 1);
    var daysInMonth: number = new Date(theDate.getFullYear(), theDate.getMonth()+1, 0).getDate();
    var daysInPriorMonth: number = new Date(theDate.getFullYear(), theDate.getMonth(), 0).getDate();

    var daysArray: Object[][] = [];
    var numDay = 1; // counter to tell when weeks are over
    var firstWeek = true;
    var lastWeek = 1;

    while(numDay <= daysInMonth) {
      var tmpWeek: Object[] = [];
      for (var i= 0; i <= 6; i++) {
        if (firstWeek && i < changedDate.getUTCDay()) {
          var firstOne = daysInPriorMonth - changedDate.getUTCDay() + i + 1;
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

  onSwipe(e, swipeCard: Card) {
    // deltaX > 0 when swiping right
    // deltaX < 0 when swiping left
    if (e.deltaX > 0) {
      this.goBackISay(swipeCard);
    } else {
      this.goForwardISay(swipeCard);
    }
  }

  boom(i) {
    this.telemetry = "Pressed >  " + i.day + " , " + i.lighten;
  }

}
