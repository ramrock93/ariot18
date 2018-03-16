import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {ShowComponent} from "./show/show.component";
import {PresenterComponent} from "./presenter/presenter.component";

import {AngularFontAwesomeModule} from "angular-font-awesome";

const appRoutes: Routes = [
  {path: "presenter", component: PresenterComponent},
  {path: "show/:id", component: ShowComponent},

  {
    path: "",
    redirectTo: "/presenter",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    PresenterComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
