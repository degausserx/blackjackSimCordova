export class Player {
    playerStrategy = new Map<string, Map<number, string>>();

    constructor(playerStrategy: Map<string, Map<number, string>> = new Map<string, Map<number, string>>()) {
        if (playerStrategy.size < 1) {
            this.playerStrategy = this.getDefaults()
        }
        else {
            this.playerStrategy = playerStrategy;
        }
    }

    getBaseStrat(player: string, dealer: number): string {
        return this.playerStrategy.get(player).get(dealer);
    }

    putBaseStrat(player: string, dealer: number, strat: string) {
        var playerHand = this.playerStrategy.get(player);
        playerHand.set(dealer, strat);
        this.playerStrategy.set(player, playerHand);
    }

    getDefaults(): Map<string, Map<number, string>> {
        var tempMap = new Map<string, Map<number, string>>();

        var map_2 = new Map<number, string>();
        var map_5 = new Map<number, string>();
        var map_9 = new Map<number, string>();
        var map_10 = new Map<number, string>();
        var map_12 = new Map<number, string>();
        var map_13 = new Map<number, string>();
        var map_14 = new Map<number, string>();
        var map_15 = new Map<number, string>();
        var map_16 = new Map<number, string>();
        var map_17 = new Map<number, string>();
        var map_18 = new Map<number, string>();
        var map_A2 = new Map<number, string>();
        var map_A4 = new Map<number, string>();
        var map_A6 = new Map<number, string>();
        var map_A7 = new Map<number, string>();
        var map_22 = new Map<number, string>();
        var map_33 = new Map<number, string>();
        var map_44 = new Map<number, string>();
        var map_55 = new Map<number, string>();
        var map_66 = new Map<number, string>();
        var map_77 = new Map<number, string>();
        var map_88 = new Map<number, string>();
        var map_99 = new Map<number, string>();
        var map_TT = new Map<number, string>();
        var map_AA = new Map<number, string>();

        map_2.set(2, "H");
        map_2.set(3, "H");
        map_2.set(4, "H");
        map_2.set(5, "H");
        map_2.set(6, "H");
        map_2.set(7, "H");
        map_2.set(8, "H");
        map_2.set(9, "H");
        map_2.set(10, "H");
        map_2.set(11, "H");
        map_5.set(2, "H");
        map_5.set(3, "H");
        map_5.set(4, "H");
        map_5.set(5, "H");
        map_5.set(6, "H");
        map_5.set(7, "H");
        map_5.set(8, "H");
        map_5.set(9, "H");
        map_5.set(10, "H");
        map_5.set(11, "A");
        map_9.set(2, "H");
        map_9.set(3, "D");
        map_9.set(4, "D");
        map_9.set(5, "D");
        map_9.set(6, "D");
        map_9.set(7, "H");
        map_9.set(8, "H");
        map_9.set(9, "H");
        map_9.set(10, "H");
        map_9.set(11, "H");
        map_10.set(2, "D");
        map_10.set(3, "D");
        map_10.set(4, "D");
        map_10.set(5, "D");
        map_10.set(6, "D");
        map_10.set(7, "D");
        map_10.set(8, "D");
        map_10.set(9, "D");
        map_10.set(10, "H");
        map_10.set(11, "H");
        map_12.set(2, "H");
        map_12.set(3, "H");
        map_12.set(4, "X");
        map_12.set(5, "X");
        map_12.set(6, "X");
        map_12.set(7, "H");
        map_12.set(8, "H");
        map_12.set(9, "H");
        map_12.set(10, "H");
        map_12.set(11, "A");
        map_13.set(2, "H");
        map_13.set(3, "X");
        map_13.set(4, "X");
        map_13.set(5, "X");
        map_13.set(6, "X");
        map_13.set(7, "H");
        map_13.set(8, "H");
        map_13.set(9, "H");
        map_13.set(10, "H");
        map_13.set(11, "A");
        map_14.set(2, "X");
        map_14.set(3, "X");
        map_14.set(4, "X");
        map_14.set(5, "X");
        map_14.set(6, "X");
        map_14.set(7, "H");
        map_14.set(8, "H");
        map_14.set(9, "H");
        map_14.set(10, "A");
        map_14.set(11, "A");
        map_15.set(2, "X");
        map_15.set(3, "X");
        map_15.set(4, "X");
        map_15.set(5, "X");
        map_15.set(6, "X");
        map_15.set(7, "H");
        map_15.set(8, "H");
        map_15.set(9, "H");
        map_15.set(10, "A");
        map_15.set(11, "A");
        map_16.set(2, "X");
        map_16.set(3, "X");
        map_16.set(4, "X");
        map_16.set(5, "X");
        map_16.set(6, "X");
        map_16.set(7, "H");
        map_16.set(8, "H");
        map_16.set(9, "A");
        map_16.set(10, "A");
        map_16.set(11, "A");
        map_17.set(2, "X");
        map_17.set(3, "X");
        map_17.set(4, "X");
        map_17.set(5, "X");
        map_17.set(6, "X");
        map_17.set(7, "X");
        map_17.set(8, "X");
        map_17.set(9, "X");
        map_17.set(10, "X");
        map_17.set(11, "A");
        map_18.set(2, "X");
        map_18.set(3, "X");
        map_18.set(4, "X");
        map_18.set(5, "X");
        map_18.set(6, "X");
        map_18.set(7, "X");
        map_18.set(8, "X");
        map_18.set(9, "X");
        map_18.set(10, "X");
        map_18.set(11, "X");
        map_A2.set(2, "H");
        map_A2.set(3, "H");
        map_A2.set(4, "H");
        map_A2.set(5, "D");
        map_A2.set(6, "D");
        map_A2.set(7, "H");
        map_A2.set(8, "H");
        map_A2.set(9, "H");
        map_A2.set(10, "H");
        map_A2.set(11, "H");
        map_A4.set(2, "H");
        map_A4.set(3, "H");
        map_A4.set(4, "D");
        map_A4.set(5, "D");
        map_A4.set(6, "D");
        map_A4.set(7, "H");
        map_A4.set(8, "H");
        map_A4.set(9, "H");
        map_A4.set(10, "H");
        map_A4.set(11, "H");
        map_A6.set(2, "H");
        map_A6.set(3, "D");
        map_A6.set(4, "D");
        map_A6.set(5, "D");
        map_A6.set(6, "D");
        map_A6.set(7, "H");
        map_A6.set(8, "H");
        map_A6.set(9, "H");
        map_A6.set(10, "H");
        map_A6.set(11, "H");
        map_A7.set(2, "X");
        map_A7.set(3, "E");
        map_A7.set(4, "E");
        map_A7.set(5, "E");
        map_A7.set(6, "E");
        map_A7.set(7, "X");
        map_A7.set(8, "X");
        map_A7.set(9, "H");
        map_A7.set(10, "H");
        map_A7.set(11, "H");
        map_AA.set(2, "S");
        map_AA.set(3, "S");
        map_AA.set(4, "S");
        map_AA.set(5, "S");
        map_AA.set(6, "S");
        map_AA.set(7, "S");
        map_AA.set(8, "S");
        map_AA.set(9, "S");
        map_AA.set(10, "S");
        map_AA.set(11, "H");
        map_22.set(2, "S");
        map_22.set(3, "S");
        map_22.set(4, "S");
        map_22.set(5, "S");
        map_22.set(6, "S");
        map_22.set(7, "S");
        map_22.set(8, "H");
        map_22.set(9, "H");
        map_22.set(10, "H");
        map_22.set(11, "H");
        map_33.set(2, "S");
        map_33.set(3, "S");
        map_33.set(4, "S");
        map_33.set(5, "S");
        map_33.set(6, "S");
        map_33.set(7, "S");
        map_33.set(8, "H");
        map_33.set(9, "H");
        map_33.set(10, "H");
        map_33.set(11, "A");
        map_44.set(2, "H");
        map_44.set(3, "H");
        map_44.set(4, "H");
        map_44.set(5, "S");
        map_44.set(6, "S");
        map_44.set(7, "H");
        map_44.set(8, "H");
        map_44.set(9, "H");
        map_44.set(10, "H");
        map_44.set(11, "H");
        map_55.set(2, "D");
        map_55.set(3, "D");
        map_55.set(4, "D");
        map_55.set(5, "D");
        map_55.set(6, "D");
        map_55.set(7, "D");
        map_55.set(8, "D");
        map_55.set(9, "D");
        map_55.set(10, "H");
        map_55.set(11, "H");
        map_66.set(2, "S");
        map_66.set(3, "S");
        map_66.set(4, "S");
        map_66.set(5, "S");
        map_66.set(6, "S");
        map_66.set(7, "H");
        map_66.set(8, "H");
        map_66.set(9, "H");
        map_66.set(10, "H");
        map_66.set(11, "A");
        map_77.set(2, "S");
        map_77.set(3, "S");
        map_77.set(4, "S");
        map_77.set(5, "S");
        map_77.set(6, "S");
        map_77.set(7, "S");
        map_77.set(8, "H");
        map_77.set(9, "H");
        map_77.set(10, "A");
        map_77.set(11, "A");
        map_88.set(2, "S");
        map_88.set(3, "S");
        map_88.set(4, "S");
        map_88.set(5, "S");
        map_88.set(6, "S");
        map_88.set(7, "S");
        map_88.set(8, "S");
        map_88.set(9, "S");
        map_88.set(10, "A");
        map_88.set(11, "A");
        map_99.set(2, "S");
        map_99.set(3, "S");
        map_99.set(4, "S");
        map_99.set(5, "S");
        map_99.set(6, "S");
        map_99.set(7, "X");
        map_99.set(8, "S");
        map_99.set(9, "S");
        map_99.set(10, "X");
        map_99.set(11, "X");
        map_TT.set(2, "X");
        map_TT.set(3, "X");
        map_TT.set(4, "X");
        map_TT.set(5, "X");
        map_TT.set(6, "X");
        map_TT.set(7, "X");
        map_TT.set(8, "X");
        map_TT.set(9, "X");
        map_TT.set(10, "X");
        map_TT.set(11, "X");

        tempMap.set("3", new Map(map_2));
        tempMap.set("4", new Map(map_2));
        tempMap.set("8", new Map(map_2));
        tempMap.set("5", new Map(map_5));
        tempMap.set("6", new Map(map_5));
        tempMap.set("7", new Map(map_5));
        tempMap.set("9", new Map(map_9));
        tempMap.set("10", new Map(map_10));
        tempMap.set("11", new Map(map_10));
        tempMap.set("12", new Map(map_12));
        tempMap.set("13", new Map(map_13));
        tempMap.set("14", new Map(map_14));
        tempMap.set("15", new Map(map_15));
        tempMap.set("16", new Map(map_16));
        tempMap.set("17", new Map(map_17));
        tempMap.set("18", new Map(map_18));
        tempMap.set("19", new Map(map_18));
        tempMap.set("20", new Map(map_18));
        tempMap.set("A2", new Map(map_A2));
        tempMap.set("A3", new Map(map_A2));
        tempMap.set("A4", new Map(map_A4));
        tempMap.set("A5", new Map(map_A4));
        tempMap.set("A6", new Map(map_A6));
        tempMap.set("A7", new Map(map_A7));
        tempMap.set("A8", new Map(map_18));
        tempMap.set("A9", new Map(map_18));
        tempMap.set("AA", new Map(map_AA));
        tempMap.set("22", new Map(map_22));
        tempMap.set("33", new Map(map_33));
        tempMap.set("44", new Map(map_44));
        tempMap.set("55", new Map(map_55));
        tempMap.set("66", new Map(map_66));
        tempMap.set("77", new Map(map_77));
        tempMap.set("88", new Map(map_88));
        tempMap.set("99", new Map(map_99));
        tempMap.set("TT", new Map(map_TT));

        return tempMap;
    }
}