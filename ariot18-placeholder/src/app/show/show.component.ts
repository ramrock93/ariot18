import { Component, OnInit } from '@angular/core';
import {PresenterService} from '../presenter.service';
import {SlideData} from '../SlideData';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageModel} from "../ImageModel";


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  prototypeUrls = [
    'https://cdn.pixabay.com/photo/2018/02/26/16/30/eggs-3183410_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/02/27/07/36/nature-3184889_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/03/06/21/09/easter-3204589_1280.jpg'
  ]
  imgSrcUrl: string;
  cnt = 0;
  secondsPerSlide = 5;
  slideData: ImageModel;
  sessionId: number;
  maxSlides: number;
  sub: any;
  private interval: any;
  private started: boolean;

  constructor(private presenterService: PresenterService,
              private route: ActivatedRoute,
              private router: Router) {
    this.imgSrcUrl = this.prototypeUrls[0];
  }
  ngOnInit() {
    this.maxSlides = 5;
    this.started = false;
    this.cnt = 0;
    this.interval = setInterval(() => {
      this.getSlideData();
    }, this.secondsPerSlide * 1000);

    this.sub = this.route.params.subscribe(params => {
      console.log(params)
      this.sessionId = params['id'] * 1;
    });
  }
  getSlideData(): void {

    console.log('getslidedata is called' + this.started +    " " + this.cnt);
    this.presenterService.getSlideData(this.sessionId)
      .then((slidedata) => {
        if (slidedata) {
          this.slideData = slidedata;
          if (this.slideData.url) {
            this.started = true;
            this.setUrl(this.slideData.url);
          } else {
            this.switchImage();
          }
        }
      })
      .catch(this.handleError); // this.switchImage()
  }

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
console.log('ERROR');
return Promise.reject(error.message || error);
}
moveOn(): void {
  if (this.cnt > this.maxSlides) {
  console.log('navigate!');
  clearInterval(this.interval);
  this.router.navigate(['thankyou']);
}
}

switchImage(): void {

  this.setUrl(this.prototypeUrls[this.cnt % 3]);
}
setUrl(url: string): void {
  this.moveOn();
if (this.started) {
  this.cnt = this.cnt + 1;
  this.imgSrcUrl = url;
}

}
}
