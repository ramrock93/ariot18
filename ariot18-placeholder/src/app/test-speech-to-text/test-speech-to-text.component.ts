import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpeechRecognitionService} from '../speech-recognition.service';
import {PresenterService} from "../presenter.service";
import {SlideData} from "../SlideData";

@Component({
  selector: 'app-test-speech-to-text',
  templateUrl: './test-speech-to-text.component.html',
  styleUrls: ['./test-speech-to-text.component.css']
})
export class TestSpeechToTextComponent implements OnInit, OnDestroy {

  slideData: SlideData;
  speechData: string;
  sessionId: number;

  constructor( private speechRecognitionService: SpeechRecognitionService,
  private presenterService: PresenterService) {
    this.speechData = '';
    this.slideData = new SlideData();
  }

  ngOnInit() {
    this.start();
    this.startSession();
    /*
    setInterval(() => {
      this.stop();
    }, 5000);
    */
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  stop(): void {
    this.speechRecognitionService.stopRecording();
  }

  start(): void {

    this.speechRecognitionService.record()
      .subscribe(
        // listener
        (value) => {
          this.speechData += value;
          console.log(value);
        },
        // error
        (err) => {
          console.log(err);
          if (err.error === 'no-speech') {
            console.log('--restatring service--');
            this.start();
          }
        },
        // completion
        () => {
          console.log('--complete--');
          this.start();
        });
  }
  startSession(): void {
    this.presenterService.getId().then(
      (data) => {
        this.sessionId = data;
    });
  }
  getSlideData(): void {
    const data = this.presenterService.getSlideData(this.sessionId)
      .then((slidedata) => this.slideData = slidedata);
  }

}
