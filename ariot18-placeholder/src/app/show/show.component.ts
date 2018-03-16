import { Component, OnInit } from '@angular/core';
import {PresenterService} from '../presenter.service';
import {SlideData} from '../SlideData';
import {ActivatedRoute, Router} from '@angular/router';


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
  slideData: SlideData;
  sessionId: number;
  maxSlides: number;
  sub: any;
  private interval: any;

  constructor(private presenterService: PresenterService,
              private route: ActivatedRoute,
              private router: Router) {
    this.imgSrcUrl = this.prototypeUrls[0];
  }
  ngOnInit() {
    this.maxSlides = 5;
    this.interval = setInterval(() => {
      this.getSlideData();
    }, this.secondsPerSlide * 1000);

    this.sub = this.route.params.subscribe(params => {
      console.log(params)
      this.sessionId = params['id'] * 1;
    });
  }
  getSlideData(): void {
    if ( this.sessionId ){
      this.presenterService.getSlideData(this.sessionId)
        .then((slidedata) => {
          this.slideData = slidedata;
          if (this.slideData.images) {
            this.setUrl(this.slideData.images[0].url);
          } else {
            this.switchImage();
          }
        })
        .catch(() => this.switchImage());
    } else {
      this.switchImage();
    }
  }
  moveOn(): void {
    if (this.cnt > this.maxSlides) {
      console.log('navigate!');
      clearInterval(this.interval);
      this.router.navigate(['thankyou']);
    }
  }

  switchImage(): void {
    this.setUrl(this.prototypeUrls[++this.cnt % 3]);
  }
  setUrl(url: string): void {
    this.moveOn();
    this.imgSrcUrl = url;
  }
}
