import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AngularFontAwesomeModule} from "angular-font-awesome";

import { AppComponent } from './app.component';
import { PresenterComponent } from './presenter/presenter.component';
import {RouterModule, Routes} from '@angular/router';
import { ShowComponent } from './show/show.component';
import {SpeechRecognitionService} from './speech-recognition.service';
import {PresenterService} from './presenter.service';
import {HttpClientModule} from '@angular/common/http';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { RecordingComponent } from './recording/recording.component';
import {RecorderService} from "./recorder.service";

const appRoutes: Routes = [
  { path: 'presenter', component: PresenterComponent },
  { path: 'show/:id',      component: ShowComponent },
  { path: 'thankyou',      component: ThankyouComponent },
  { path: 'recording/:id/:keywords',      component: RecordingComponent },
  {
    path: "",
    redirectTo: "/presenter",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PresenterComponent,
    ShowComponent,
    ThankyouComponent,
    RecordingComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [
    SpeechRecognitionService,
    PresenterService,
    RecorderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
