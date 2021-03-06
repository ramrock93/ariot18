import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SlideData} from './SlideData';
import {ImageModel} from './ImageModel';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PresenterService {
  baseurl = 'http://interaktivdemo.northeurope.cloudapp.azure.com/api/presentation/';
  startSessionUrl =  this.baseurl + 'startsession';
  uploadTextUrl = this.baseurl + 'uploadText';
  getSlideDataUrl = this.baseurl + 'getslidedata';

  constructor( private http: HttpClient) {}

  getId (): Promise<number> {
    return this.http.get<number>(this.startSessionUrl)
      .toPromise();
}
/*
  uploadText (): Observable<number> {
    return this.http.post(this.uploadTextUrl)
  }
  */

  getSlideData (id: number): Promise<ImageModel> {
    return this.http.get(this.getSlideDataUrl + '/' + id)
      .toPromise()
      .then((response: Response) =>  this.parseToImageModel((<any>response).data))
      .catch(this.handleError);
  }

  parseToSlideData(data: any): SlideData {
    if (data === undefined) {
      return new SlideData();
    }
    const sd = new SlideData();
    sd.id = data.Id;
    sd.images = [];
    if (data.Images) {
      for (let i = 0; i < data.Images.length; i++ ) {
        sd.images = sd.images.concat(this.parseToImageModel(data.Images[i]));
      }
    }
    console.log(sd)
    return sd;
  }
  parseToImageModel(data: any): ImageModel {
    if (data === undefined) {
      return undefined;
    }

    const im = new ImageModel();
    im.text = data.text;
    im.url = data.url;
    console.log(im)
    return im;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.log('ERROR');
    return Promise.reject(error.message || error);
  }

}
