import { Injectable } from '@angular/core';
import { Execution } from '../../app/models/execution.model';
import { House } from '../../app/models/house.model';
import { Player } from '../../app/models/player.model';
import { Simulation } from '../../app/models/simulation.model';

@Injectable()
export class SettingsProvider {

    execution: Execution;
    house: House;
    player: Player;
    simulation: Simulation;

    constructor() {
        this.execution = new Execution();
        this.house = new House();
        this.player = new Player();
        this.simulation = new Simulation();

        try {
            let player1 = localStorage.getItem('player1');
            let player2 = localStorage.getItem('player2');
            let dealer = localStorage.getItem('dealer');
            let loops = localStorage.getItem('loops');

            let draw17 = localStorage.getItem('draw17');
            let holecard = localStorage.getItem('holecard');
            let doubleonsoft = localStorage.getItem('doubleonsoft');
            let splitacesone = localStorage.getItem('splitacesone');
            let splitacesnobjs = localStorage.getItem('splitacesnobjs');
            let resplitaces = localStorage.getItem('resplitaces');
            let surrender = localStorage.getItem('surrender');
            let surrendervsace = localStorage.getItem('surrendervsace');
            let surrenderearly = localStorage.getItem('surrenderearly');
            let decks = localStorage.getItem('decks');
            let maxsplits = localStorage.getItem('maxsplits');

            if (this.check(player1)) this.execution.player1 = +player1;
            if (this.check(player2)) this.execution.player2 = +player2;
            if (this.check(dealer)) this.execution.dealer = +dealer;
            if (this.check(loops)) this.execution.loops = +loops;

            if (this.boolCheck(draw17)) this.house.draw17 = (draw17 == 'true');
            if (this.boolCheck(holecard)) this.house.holecard = (holecard == 'true');
            if (this.boolCheck(doubleonsoft)) this.house.doubleonsoft = (doubleonsoft == 'true');
            if (this.boolCheck(splitacesone)) this.house.splitacesone = (splitacesone == 'true');
            if (this.boolCheck(splitacesnobjs)) this.house.splitacesnobjs = (splitacesnobjs == 'true');
            if (this.boolCheck(resplitaces)) this.house.resplitaces = (resplitaces == 'true');
            if (this.boolCheck(surrender)) this.house.surrender = (surrender == 'true');
            if (this.boolCheck(surrendervsace)) this.house.surrendervsace = (surrendervsace == 'true');
            if (this.boolCheck(surrenderearly)) this.house.surrenderearly = (surrenderearly == 'true');
            if (this.check(decks)) this.house.decks = +decks;
            if (this.check(maxsplits)) this.house.maxsplits = +maxsplits;
        } catch(error) {

        }
    }

    check(value: any): boolean {
        return (value !== undefined && value != null) ? true : false;
    }

    boolCheck(value: any): boolean {
        return (value !== undefined) ? true : false;
    }

    setValues(section: string, ref: string, value: any) {
        this[section][ref] = value;
        localStorage.setItem(ref, value);
    }

    updateBooleanValues(ref: string) {
        localStorage.setItem(ref, '' + this.house[ref]);
    }

}