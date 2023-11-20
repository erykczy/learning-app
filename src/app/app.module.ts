import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { LettersMenuComponent } from './letters-menu/letters-menu.component';
import { CustomLettersDirective } from './custom-letters.directive';
import { FormsModule } from '@angular/forms';
import { PlayModeComponent } from './play-mode/play-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LettersMenuComponent,
    CustomLettersDirective,
    PlayModeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
