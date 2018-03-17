import {Component, OnDestroy, OnInit} from "@angular/core";
import {SpeechRecognitionService} from "../speech-recognition.service";
import {RecorderService} from "../recorder.service";
import {SlideData} from "../SlideData";

@Component({
  selector: "app-recording",
  templateUrl: "./recording.component.html",
  styleUrls: ["./recording.component.css"]
})
export class RecordingComponent implements OnInit, OnDestroy {
  speechData: string;
  buttontext: string;


  constructor(private speechService: SpeechRecognitionService,
              private recordService: RecorderService) {
  }

  ngOnInit() {
    this.buttontext = "Recorder";

  }

  ngOnDestroy() {
    this.speechService.DestroySpeechObject();
  }

  startRecording() {
    this.buttontext = 'Recording';
    this.speechService.record().subscribe(res => {
      this.speechData = res + ' ';
      this.recordService.sendRecordData(+localStorage.getItem('session-id'), this.speechData + '.');
    }, error => console.log('Something went wrong...'));
  }
}
