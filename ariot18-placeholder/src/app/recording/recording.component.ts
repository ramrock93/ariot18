import {Component, OnDestroy, OnInit} from "@angular/core";
import {SpeechRecognitionService} from "../speech-recognition.service";
import {RecorderService} from "../recorder.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-recording",
  templateUrl: "./recording.component.html",
  styleUrls: ["./recording.component.css"]
})
export class RecordingComponent implements OnInit, OnDestroy {
  speechData: string;
  buttontext: string;
  private sessionId: number;
  private keywords: string;

  constructor(private speechService: SpeechRecognitionService,
              private recordService: RecorderService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.buttontext = 'Recorder';
    this.route.params.subscribe( params => {
      this.sessionId = params['id'] * 1;
      this.keywords = params['keywords'];
      this.recordService.sendRecordData(this.sessionId, this.keywords);
      console.log(params);
    });
    setInterval(this.send, 20000);
  }

  ngOnDestroy() {
    this.speechService.DestroySpeechObject();
  }
  send(): void {
    if (this.speechData !==  undefined && this.speechData.length > 0) {
      this.recordService.sendRecordData(this.sessionId, this.speechData);
      this.speechData = '';
    }
  }
  startRecording() {
    this.buttontext = 'Recording';
    this.speechService.record().subscribe(res => {
      this.speechData = this.speechData += '.' + res;
      // this.recordService.sendRecordData(this.sessionId, this.speechData);

    }, error => console.log("Something went wrong..."));
  }
}
