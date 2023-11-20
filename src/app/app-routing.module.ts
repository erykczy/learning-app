import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { PlayModeComponent } from './play-mode/play-mode.component';

const routes: Routes = [
  { path: 'editor', component: EditorComponent },
  { path: 'play', component: PlayModeComponent },
  { path: '**', redirectTo: 'editor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
