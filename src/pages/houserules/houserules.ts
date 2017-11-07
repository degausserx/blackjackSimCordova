import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider } from '../../app/providers/settings.provider';

@Component({
  selector: 'page-houserules',
  templateUrl: 'houserules.html'
})

export class HouseRulesPage {

    maxSplitOption: any;
    numberDecksOption: any;

    splits: any;
    decks: any;

    constructor(public navCtrl: NavController, public settingsProvider: SettingsProvider) {

        this.decks = [
            { index: 1, title: "One" },
            { index: 2, title: "Two" },
            { index: 3, title: "Three" },
            { index: 4, title: "Four" },
            { index: 6, title: "Six" },
            { index: 8, title: "Eight" }
        ]

        this.splits = [
            { index: 0, title: "Unlimited" },
            { index: 1, title: "One" },
            { index: 2, title: "Two" },
            { index: 3, title: "Three" }
        ]

        var newMaxSplits = this.splits.filter(entry => entry.index === this.settingsProvider.house.maxsplits)[0];
        var newNumberDecks = this.decks.filter(entry => entry.index === this.settingsProvider.house.decks)[0];

        this.maxSplitOption = newMaxSplits;
        this.numberDecksOption = newNumberDecks;

    }

    compareFn(option1: any, option2: any) {
        return option1.title === option2.title;
    }

    changeSelection(ref: string) {
        switch (ref) {
            case 'decks':
                this.settingsProvider.setValues('house', ref, this.numberDecksOption.index);
                break;
            case 'maxsplits':
                this.settingsProvider.setValues('house', ref, this.maxSplitOption.index);
                break;
            default:
                this.settingsProvider.updateBooleanValues(ref);
                break;
        }
    }

}
