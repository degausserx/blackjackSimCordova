import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider } from '../../app/providers/settings.provider';

@Component({
  selector: 'page-houserules',
  templateUrl: 'houserules.html'
})

export class HouseRulesPage {

    deckSelection: any;
    splitSelection: any;
    maxsplits: any;
    decks: any;

    constructor(public navCtrl: NavController, public settingsProvider: SettingsProvider) {

        this.deckSelection = [
            { index: 1, title: "One" },
            { index: 2, title: "Two" },
            { index: 3, title: "Three" },
            { index: 4, title: "Four" },
            { index: 6, title: "Six" },
            { index: 8, title: "Eight" }
        ];

        this.splitSelection = [
            { index: 0, title: "Unlimited" },
            { index: 1, title: "One" },
            { index: 2, title: "Two" },
            { index: 3, title: "Three" }
        ];

        this.maxsplits = this.splitSelection.filter(entry => entry.index === this.settingsProvider.house.maxsplits)[0];
        this.decks = this.deckSelection.filter(entry => entry.index === this.settingsProvider.house.decks)[0];
    }

    compareFn(option1: any, option2: any) {
        return option1.title === option2.title;
    }

    changeSelection(ref: string) {
        if ((ref == 'decks') || (ref == 'maxsplits')) this.settingsProvider.setValues('house', ref, this[ref]['index']);
        else this.settingsProvider.updateBooleanValues(ref);
    }

}
