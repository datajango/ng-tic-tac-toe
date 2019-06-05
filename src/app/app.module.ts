import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameSpaceComponent } from './game-space/game-space.component';
import { GameControlsComponent } from './game-controls/game-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameSpaceComponent,
    GameControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
