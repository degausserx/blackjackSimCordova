import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider } from '../../app/providers/settings.provider';

@Component({
  selector: 'page-execution',
  templateUrl: 'execution.html'
})

export class ExecutionPage {

    cardSelection: any;
    loopSelection: Array<number>;

    player1: any;
    player2: any;
    dealer: any;
    loops: number;

    constructor(public navCtrl: NavController, public settingsProvider: SettingsProvider) {

        this.cardSelection = [
            { index: 1, title: "None" },
            { index: 2, title: "Two" },
            { index: 3, title: "Three" },
            { index: 4, title: "Four" },
            { index: 5, title: "Five" },
            { index: 6, title: "Six" },
            { index: 7, title: "Seven" },
            { index: 8, title: "Eight" },
            { index: 9, title: "Nine" },
            { index: 10, title: "Ten" },
            { index: 11, title: "Ace" }
        ];

        this.loopSelection = [100, 1000, 5000, 10000, 100000, 500000, 1000000, 10000000, 50000000, 1000000000];

        this.player1 = this.cardSelection.filter(entry => entry.index === this.settingsProvider.execution.player1)[0];
        this.player2 = this.cardSelection.filter(entry => entry.index === this.settingsProvider.execution.player2)[0];
        this.dealer = this.cardSelection.filter(entry => entry.index === this.settingsProvider.execution.dealer)[0];
        this.loops = this.settingsProvider.execution.loops;
    }

    compareFn(option1: any, option2: any) {
        return option1.title === option2.title;
    }

    changeSelection(ref: string) {
        if (ref == 'loops') this.settingsProvider.setValues('execution', ref, this[ref]);
        else this.settingsProvider.setValues('execution', ref, this[ref]['index']);
    }

}
