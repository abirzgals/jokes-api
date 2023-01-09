import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {JokesComponent} from "./jokes/jokes.component";


const routes: Routes = [
  { path: '', component: JokesComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
