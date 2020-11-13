import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlaygroundComponent } from './components/playground/playground.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
