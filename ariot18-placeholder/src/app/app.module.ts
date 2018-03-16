import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PresenterComponent } from './presenter/presenter.component';
import {RouterModule, Routes} from '@angular/router';
import { ShowComponent } from './show/show.component';
import {SpeechRecognitionService} from './speech-recognition.service';
import { TestSpeechToTextComponent } from './test-speech-to-text/test-speech-to-text.component';
import {PresenterService} from './presenter.service';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'presenter', component: PresenterComponent },
  { path: 'show/:id',      component: ShowComponent },
  { path: 'test',      component: TestSpeechToTextComponent },


  { path: '',
    redirectTo: '/presenter',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PresenterComponent,
    ShowComponent,
    TestSpeechToTextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
      )
  ],
  providers: [SpeechRecognitionService, PresenterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
