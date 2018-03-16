import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpeechRecognitionService} from '../speech-recognition.service';

@Component({
  selector: 'app-test-speech-to-text',
  templateUrl: './test-speech-to-text.component.html',
  styleUrls: ['./test-speech-to-text.component.css']
})
export class TestSpeechToTextComponent implements OnInit, OnDestroy {

  speechData: string;

  constructor( private speechRecognitionService: SpeechRecognitionService) {
    this.speechData = '';
  }

  ngOnInit() {
    this.start();
    /*
    setInterval(() => {
      this.stop();
    }, 5000);
    */
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  stop() {
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

}
