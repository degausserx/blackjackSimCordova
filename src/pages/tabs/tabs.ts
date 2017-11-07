import { Component } from '@angular/core';

import { SimulationPage } from '../simulation/simulation';
import { HouseRulesPage } from '../houserules/houserules';
import { PlayerStratPage } from '../playerstrat/playerstrat';
import { ExecutionPage } from '../execution/execution';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SimulationPage;
  tab2Root = HouseRulesPage;
  tab3Root = PlayerStratPage;
  tab4Root = ExecutionPage;

  constructor() {

  }
}
