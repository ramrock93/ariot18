import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-presenter",
  templateUrl: "./presenter.component.html",
  styleUrls: ["./presenter.component.css"]
})
export class PresenterComponent implements OnInit {
  private _sessionId = 123;

  constructor() {
  }

  ngOnInit() {
  }

  play(event) {
    console.log("Play button clicked");
  }


  get sessionId() {
    return this._sessionId;
  }

  set sessionId(value) {
    this._sessionId = value;
  }
}
