import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SlideData} from "./SlideData";

@Injectable()
export class RecorderService {
  get slideData(): SlideData {
    return this._slideData;
  }

  set slideData(value: SlideData) {
    this._slideData = value;
  }

  private baseurl = 'http://interaktivdemo.northeurope.cloudapp.azure.com/api/presentation/';
  private uploadTextUrl = this.baseurl + 'uploadslidedata/';
  private _getSlideDataUrl = this.baseurl + 'getslidedata/';

  private _slideData: SlideData;

  constructor(private http: HttpClient) {
  }

  sendRecordData(sessionId: number, recordData: string) {
    this.http.post(this.uploadTextUrl, {id: sessionId, text: recordData})
      .subscribe(res => {
        console.log('Response is: ', res);
      });
  }

  get getSlideDataUrl(): string {
    return this._getSlideDataUrl;
  }


}
