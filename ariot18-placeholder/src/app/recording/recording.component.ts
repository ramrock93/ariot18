import { Component, OnInit } from '@angular/core';
import {SpeechRecognitionService} from "../speech-recognition.service";
import {RecorderService} from "../recorder.service";

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.css']
})
export class RecordingComponent implements OnInit {
  speechData: string;

  constructor(private speechService: SpeechRecognitionService,
              private recordService: RecorderService) { }

  ngOnInit() {
  }

  startRecording() {
    this.speechService.record().subscribe(res => {

      this.speechData = res;
      this.recordService.sendRecordData(+localStorage.getItem('session-id'), this.speechData);

    }, error => console.log("Something went wrong..."));
  }
}
