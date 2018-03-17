import {Component, OnInit} from "@angular/core";
import {PresenterService} from "../presenter.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-presenter",
  templateUrl: "./presenter.component.html",
  styleUrls: ["./presenter.component.css"]
})
export class PresenterComponent implements OnInit {
  private _sessionId;
  private  keywords: string;
  constructor(private presenterService: PresenterService, private router: Router) {
  }

  ngOnInit() {
    this.presenterService.getId().then(res => {
      this. _sessionId = res.valueOf();
      localStorage.setItem('session-id', this._sessionId);
    });
    this.keywords = '';
  }

  play(event) {
    console.log("Play button clicked");
    if (!this.sessionId) {
      this.sessionId = 0;
    }
    this.router.navigateByUrl('/recording/' + this.sessionId + "/" + this.keywords);

  }

  onChange(event) {
    this.keywords = event.target.value
  }


  get sessionId() {
    return this._sessionId;
  }

  set sessionId(value) {
    this._sessionId = value;
  }
}
