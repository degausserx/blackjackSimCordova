export class Simulation {

    // sim stuff
    deck: Array<number>;
    deckSource: Array<number>;

    // settings
    strat: Map<string, Map<number, string>>;
    draw17: boolean;
    holecard: boolean;
    doubleonsoft: boolean;
    splitacesone: boolean;
    splitacesnobjs: boolean;
    resplitaces: boolean;
    surrender: boolean;
    surrendervsace: boolean;
    surrenderearly: boolean;
    decks: number;
    maxsplits: number;
    player1: number;
    player2: number;
    dealer: number;
    loops: number;

    // stats
    games: number = 0;
    hands: number = 0;
    dealer_bust: number = 0;
    dealer_lose: number = 0;
    dealer_win: number = 0;
    units_won: number = 0;
    units_lost: number = 0;
    blackjacks: number = 0;
    dealer_draw: number = 0;
    splits: number = 0;

    // init all
    constructor() {

    }

}
