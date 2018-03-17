import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {
  speechRecognition: any;

  constructor(private zone: NgZone) {
  }
  stopRecording() {
    this.speechRecognition.stop();
  }

  record(): Observable<string> {

    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      this.speechRecognition = new webkitSpeechRecognition();
      // this.speechRecognition = SpeechRecognition;
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-us';
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = speech => {
        let term = '';
        let interim_transcript = '';
        console.log("onresult")
        for (let i = speech.resultIndex; i < speech.results.length; ++i) {
          if (speech.results[i].isFinal) {
            console.log('result confidence: ' + speech.results[i][0].confidence);
            term += speech.results[i][0].transcript;
          } else {
            interim_transcript += speech.results[i][0].transcript;
          }
        }
        this.zone.run(() => {
          observer.next(term);
        });
      };

      this.speechRecognition.onerror = error => {
        observer.error(error);
      };

      this.speechRecognition.onend = () => {
        observer.complete();
      };

      this.speechRecognition.start();
      console.log('Say something - We are listening !!!');
    });
  }

  DestroySpeechObject() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
  }
}
