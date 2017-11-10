import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider } from '../../app/providers/settings.provider';
import { Simulation } from '../../app/models/simulation.model';
import { WebWorkerService } from 'angular2-web-worker';

@Component({
  selector: 'page-simulation',
  templateUrl: 'simulation.html',
  providers: [WebWorkerService]
})

export class SimulationPage {

  constructor(public navCtrl: NavController, public settingsProvider: SettingsProvider, private _webWorkerService: WebWorkerService) {}

  loadProgress: number = 0;
  buttonTextStart = 'Start';
  simulation: Simulation;
  continueSimulation = false;

  games: number = 0;
  hands: number = 0;
  losses: number = 0;
  wins: number = 0;
  draws: number = 0;
  splits: number = 0;
  unitsWon: number = 0;
  unitsLost: number = 0;
  dealerBust: number = 0;
  blackjacks: number = 0;

  edgeText: number = 0;
  blackjackPercentText: number = 0;
  dealerBustRateText: number = 0;

  totalUnits(): number {
    return (this.unitsLost + this.unitsWon);
  }

  edge(): number {
    let total = this.totalUnits();
    return +(((this.unitsLost / total) - (this.unitsWon / total)) * 100.0).toFixed(4);
  }

  blackjackPercent(): number {
    return +(((this.simulation.splitacesnobjs) ? (this.blackjacks / this.games) : (this.blackjacks / this.hands)) * 100.0).toFixed(4);
  }

  dealerBustRate(): number {
    return +((this.dealerBust / this.games) * 100.0).toFixed(4);
  }

  startSimulation() {
    if (this.buttonTextStart == 'Start') {
      this.buttonTextStart = 'Stop';
      this.loadProgress = 0;
      this.continueSimulation = true;
      let simulation = this.fillSimulation();
      this.runSimulation(simulation, 0);
    } else {
      this.addValues();
    }
  }

  fillSimulation(): Simulation {
    let simulation = new Simulation()
    simulation.strat = this.settingsProvider.player.playerStrategy;
    simulation.draw17 = this.settingsProvider.house.draw17;
    simulation.holecard = this.settingsProvider.house.holecard;
    simulation.doubleonsoft = this.settingsProvider.house.doubleonsoft;
    simulation.splitacesone = this.settingsProvider.house.splitacesone;
    simulation.splitacesnobjs = this.settingsProvider.house.splitacesnobjs;
    simulation.resplitaces = this.settingsProvider.house.resplitaces;
    simulation.surrender = this.settingsProvider.house.surrender;
    simulation.surrendervsace = this.settingsProvider.house.surrendervsace;
    simulation.surrenderearly = this.settingsProvider.house.surrenderearly;
    simulation.decks = this.settingsProvider.house.decks;
    simulation.maxsplits = this.settingsProvider.house.maxsplits;
    simulation.player1 = this.settingsProvider.execution.player1;
    simulation.player2 = this.settingsProvider.execution.player2;
    simulation.dealer = this.settingsProvider.execution.dealer;
    simulation.loops = this.settingsProvider.execution.loops / 100;

    const numberOfCards = simulation.decks * 52;
    simulation.deckSource = new Array(numberOfCards).join().split(',').map(function(item, index){
      let n = (index % 13) + 2;
      return (n > 11) ? 10 : n;
    })

    if (simulation.player1 != 1) simulation.deckSource.splice(simulation.deckSource.indexOf(simulation.player1), 1);
    if (simulation.player2 != 1) simulation.deckSource.splice(simulation.deckSource.indexOf(simulation.player2), 1);
    if (simulation.dealer != 1) simulation.deckSource.splice(simulation.deckSource.indexOf(simulation.dealer), 1);
    simulation.deck = simulation.deckSource.slice();

    console.log(simulation.deckSource.filter((num) => {
      return (num == 10) // integrity check, result = decks * 16
    }).length)

    return simulation;
  }

  addValues() {
    if (this.loadProgress != 100) this.loadProgress = 0;
    this.continueSimulation = false;
    this.buttonTextStart = 'Start';

    this.games = this.simulation.games;
    this.hands = this.simulation.hands;
    this.wins = this.simulation.dealer_lose;
    this.losses = this.simulation.dealer_win;
    this.draws = this.simulation.dealer_draw;
    this.unitsWon = this.simulation.units_won / 2;
    this.unitsLost = this.simulation.units_lost / 2;
    this.splits = this.simulation.splits;
    this.dealerBust = this.simulation.dealer_bust;
    this.blackjacks = this.simulation.blackjacks;

    this.blackjackPercentText = this.blackjackPercent();
    this.dealerBustRateText = this.dealerBustRate();
    this.edgeText = this.edge();
  }

  runSimulation(simulation: Simulation, index: number) {
    
    let promise = this._webWorkerService.run(this.processSimulation, simulation);
    promise.then((newSimulation) => {
      index++;
      this.simulation = newSimulation;
      this.loadProgress = index;
      if (index >= 100 || !this.continueSimulation) {
        this.addValues();
      }
      else {
        this.runSimulation(newSimulation, index);
      }
    }).catch(error => {
      this.addValues();
    });
  }

  processSimulation(simulation: Simulation): Simulation {
    let numberOfLoops: number = simulation.loops;

    let shuffle = () => {
      simulation.deck = simulation.deckSource.slice();
    }

    let drawCard = (): number => {
      if (simulation.deck.length < 1) shuffle();
      let randomNum: number = ~~(Math.random() * simulation.deck.length);
      let returnInt: number = simulation.deck[randomNum];
      simulation.deck.splice(randomNum, 1);
      return returnInt;
    }

    let getDealer = (total: number): number => {
      var start: boolean = true, soft: boolean = (total == 11) ? true : false, newCard: number;
      do {
        newCard = drawCard();
        if (newCard == 11) {
          if (total < 11) {
            total += 11;
            soft = true;
          }
          else total++;
        }
        else {
          total += newCard;
          if (soft && total > 21) {
            total -= 10;
            soft = false;
          }
        }
        if (start && total == 21) return 35;
        start = false;
      } while (total < 17 || (simulation.draw17 && total == 17 && soft))
      return total;
    }

    let getPlayer = (player: number, dealer: number, dealerFinish: number, split: number, entry: boolean): number => {
      // declarations
      var newCard: number = 0, hit: number = 0, cards: number = (entry) ? 0 : 1;
      var playerHand: number = player, dealerHand: number = dealerFinish, splitHand: number = split;
      var blackjack: boolean = false, doubleBet: boolean = false, pair: boolean, soft: boolean = false;
      var allowSplit: boolean = true, looping: boolean = true;
      var playerString: string, strat: string, tempNum: number = 0;

      // run loops
      while (looping) {
        looping = false;
        pair = false; // *fixed

        // *fixed
        newCard = (splitHand < 1 && simulation.player1 != 1) ? simulation.player1 : drawCard();
        cards += 1;
        if (cards == 1) {
          playerHand = (splitHand < 1 && simulation.player2 != 1) ? simulation.player2 : drawCard();
          cards += 1;
        }
        if (playerHand == 11 || newCard == 11) soft = true;
        if (playerHand == newCard) {
          pair = true;
          if ((playerHand == 11 && splitHand > 0 && !simulation.resplitaces) || (splitHand >= simulation.maxsplits && simulation.maxsplits != 0)) {
            allowSplit = false;
          }
        }
        newCard += playerHand;
        if (newCard == 21) {
          if (splitHand == 0 || !simulation.splitacesnobjs) blackjack = true;
          playerHand = newCard;
          break;
        }
        if (playerHand == 11 && splitHand > 0 && simulation.splitacesone) {
          if (newCard != 22 || (newCard == 22 && !allowSplit)) {
            playerHand = (newCard == 22) ? 12 : newCard;
            break;
          }
        }
        playerHand = (newCard == 22) ? 12 : newCard;

        // strategy
        // simulation loop
        if (!blackjack) {
          if (simulation.holecard && dealerFinish == 35 && (!simulation.surrender || (simulation.surrender && !simulation.surrenderearly))) break;
          while (playerHand < 21) {
            playerString = '';
            if (cards > 2) pair = false;
            if (pair && allowSplit) {
              if (soft) playerString = 'AA';
              else if (playerHand == 20) playerString = 'TT';
              else {
                tempNum = playerHand / 2;
                playerString = '' + tempNum + tempNum;
              }
            }
            else if (soft) playerString = (playerHand == 12) ? 'AAA' : 'A' + (playerHand - 11);
            else playerString = '' + playerHand;
            
            // make a call for the strategy. 'dealer' is an int
            strat = (playerString != 'AAA') ? simulation.strat.get(playerString).get(dealer) : 'H';
            
            // if the move is "surrender" or "surrender, otherwise stand"
            if (strat == 'A' || strat == 'B') {
              if (cards == 2 && simulation.surrender && splitHand == 0 && (simulation.surrendervsace || dealer != 11)) {
                playerHand = -5;
                break;
              }
              if (strat == 'B') break;
              hit = 1;
            }
                
            // if the dealer has blackjack, after the chance to surrender, auto lose
            if (cards == 2 && dealerFinish == 35 && simulation.holecard) break;
                
            // if the move is 'no card'
            if (strat == 'X') break;
                
            // splitting 2 cards recursively
            if (strat == 'S') {
              playerHand = (soft) ? 11 : (playerHand / 2);
              tempNum = splitHand + 1;
              splitHand = getPlayer(playerHand, dealer, dealerHand, tempNum, false);
              cards--;
              looping = true;
              break;
            }
                
            // double the bet
            if (strat == 'D' || strat == 'E') {
              if ((soft && !simulation.doubleonsoft) || cards > 2 || (splitHand > 0 && playerHand == 12)) { // *fixed
                if (strat == 'E') break;
                else hit = 1;
              }
              else hit = 2;
            }
                
            // if the move is taking a card
            if (strat == 'H' || hit > 0) {
              newCard = drawCard();
              if (newCard == 11) {
                if (playerHand > 10) newCard = 1;
                else soft = true;
              }
              playerHand += newCard;
              
              if (playerHand > 21 && soft) {
                soft = false;
                playerHand -= 10;
              }
              if (cards == 2 && hit == 2 && (!soft || (soft && simulation.doubleonsoft))) {
                doubleBet = true;
              }
              
              // reset 'hit', increase cards
              cards++;
              hit = 0;
            }
            if (doubleBet) break; // *fixed
          }
        }

      }

      // apply stats
      // bust corrections
      if (blackjack) {
        playerHand = 35;
        simulation.blackjacks++;
      }
      if (dealerHand > 21 && dealerHand != 35) {
        dealerHand = 22;
        if (entry) simulation.dealer_bust++;
      }
      if (playerHand > 21 && playerHand != 35) {
        playerHand = 22;
      }
    
      // games / hands
      if (entry) simulation.games++;
      simulation.hands++;
      
      // player lose
      if (playerHand == 22 || playerHand == -5 || (playerHand < dealerHand && dealerHand != 22)) {
        simulation.dealer_win++;
        if (doubleBet) simulation.units_lost += 4;
        else if (playerHand == -5) simulation.units_lost++;
        else {
          simulation.units_lost += 2;
        }
      }
    
      // player draw
      else if (playerHand == dealerHand) {
        simulation.dealer_draw++;
      }

      // player win
      else {
        simulation.dealer_lose++;
        if (playerHand == 35) simulation.units_won += 3;
        else if (doubleBet) simulation.units_won += 4;
        else simulation.units_won += 2;
      }
      
      return splitHand;
    }

    let deal = (): void => {
      if (simulation.deck.length < 25) shuffle();
      let dealerHand: number = (simulation.dealer != 1) ? simulation.dealer : drawCard();
      let dealerFinish: number = getDealer(dealerHand);
      simulation.splits += getPlayer(0, dealerHand, dealerFinish, 0, true);
    } 

    for (let x = 1; x <= numberOfLoops; x++) deal();

    return simulation;
  }

}
