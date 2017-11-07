import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SimulationPage } from '../pages/simulation/simulation';
import { HouseRulesPage } from '../pages/houserules/houserules';
import { PlayerStratPage } from '../pages/playerstrat/playerstrat';
import { ExecutionPage } from '../pages/execution/execution';
import { TabsPage } from '../pages/tabs/tabs';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsProvider } from './providers/settings.provider';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    SimulationPage,
    HouseRulesPage,
    PlayerStratPage,
    ExecutionPage,
    TabsPage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SimulationPage,
    HouseRulesPage,
    PlayerStratPage,
    ExecutionPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider
  ]
})
export class AppModule {}
