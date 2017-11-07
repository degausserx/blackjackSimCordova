import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider } from '../../app/providers/settings.provider';
import { ActionSheetController } from 'ionic-angular'

@Component({
  selector: 'page-playerstrat',
  templateUrl: 'playerstrat.html'
})
export class PlayerStratPage {

  rowIndex = 0;

  dealerRow = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'
  ];

  playerColumn = [
    '', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9',
    '', 'AA', '22', '33', '44', '55', '66', '77', '88', '99', 'TT', ''
  ];

  lightOrDark(): string {
    this.rowIndex++;
    return (this.rowIndex % 2 != 0) ? "cell-dark" : "cell-light";
  }

  constructor(public navCtrl: NavController, public settingsProvider: SettingsProvider, public actionSheetCtrl: ActionSheetController) {
    
  }

  strat: string;

  getStrat(player: string, dealer: string): string {
    var dealerInt: number;
    if (dealer == 'A') {
      dealerInt = 11;
    } else {
      dealerInt = +dealer;
    }
    return this.settingsProvider.player.getBaseStrat(player, dealerInt);
  }

  getCell(player: string, dealer: string): string {
    var dealerInt: number;
    if (dealer == 'A') {
      dealerInt = 11;
    } else {
      dealerInt = +dealer;
    }
    this.strat = this.settingsProvider.player.getBaseStrat(player, dealerInt);

    switch (this.strat) {
      case 'X': return 'cell-stand';
      case 'H': return 'cell-hit';
      case 'S': return 'cell-split';
      case 'D': return 'cell-double';
      case 'E': return 'cell-double';
      case 'A': return 'cell-surrender';
      case 'B': return 'cell-surrender';
    }
  }

  changeCell(player: string, dealer: string, strategy: string) {
    var dealerInt: number;
    if (dealer == 'A') {
      dealerInt = 11;
    } else {
      dealerInt = +dealer;
    }
    this.settingsProvider.player.putBaseStrat(player, dealerInt, strategy);

    // update cell
  }

  clickCell(player: string, dealer: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: player + ' vs ' + dealer,
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Hit',
          role: 'destructive',
          cssClass: 'cell-hit',
          handler: () => { this.changeCell(player, dealer, 'H'); }
        },
        {
          text: 'Stand',
          role: 'destructive',
          cssClass: 'cell-stand',
          handler: () => { this.changeCell(player, dealer, 'X'); }
        },
        {
          text: 'Double',
          role: 'destructive',
          cssClass: 'cell-double',
          handler: () => { this.changeCell(player, dealer, 'D'); }
        },
        {
          text: 'Double / Stand',
          role: 'destructive',
          cssClass: 'cell-double',
          handler: () => { this.changeCell(player, dealer, 'E'); }
        },
        {
          text: 'Split',
          role: 'destructive',
          cssClass: 'cell-split',
          handler: () => { this.changeCell(player, dealer, 'S'); }
        },
        {
          text: 'Surrender',
          role: 'destructive',
          cssClass: 'cell-surrender',
          handler: () => { this.changeCell(player, dealer, 'A'); }
        },
        {
          text: 'Surrender / Stand',
          role: 'destructive',
          cssClass: 'cell-surrender',
          handler: () => { this.changeCell(player, dealer, 'B'); }
        },
        {
          text: 'Cancel',
          role: 'destructive'
        }
      ]
    });
 
    actionSheet.present();
  }

}
