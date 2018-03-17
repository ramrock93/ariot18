import {Component, OnInit} from "@angular/core";
import {PresenterService} from "../presenter.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-presenter",
  templateUrl: "./presenter.component.html",
  styleUrls: ["./presenter.component.css"]
})
export class PresenterComponent implements OnInit {
  private _sessionId

  constructor(private presenterService: PresenterService, private router: Router) {
  }

  ngOnInit() {
    this.presenterService.getId().then(res => {
      this. _sessionId = res.valueOf();
      localStorage.setItem('session-id', this._sessionId);
    });
  }

  play(event) {
    console.log("Play button clicked");
    this.router.navigateByUrl('/recording/' + this.sessionId);

  }


  get sessionId() {
    return this._sessionId;
  }

  set sessionId(value) {
    this._sessionId = value;
  }
}
