import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RecorderService {
  private baseurl = "http://interaktivdemo.northeurope.cloudapp.azure.com/api/presentation/";
  private uploadTextUrl = this.baseurl + "uploadslidedata/";

  constructor(private http: HttpClient) {
  }

  sendRecordData(sessionId: number, recordData: string) {

    this.http.post(this.uploadTextUrl, {id: sessionId, text: recordData})
      .subscribe(res => console.log("Response from interaktivdemo", res));
  }
}
