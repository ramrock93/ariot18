import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RecorderService {
  private baseurl = "http://interaktivdemo.northeurope.cloudapp.azure.com/api/presentation/";
  private uploadTextUrl = this.baseurl + "uploadslidedata/";

  constructor(private http: HttpClient) {
  }

  sendRecordData(sessionId: number, recordData: string) {
    const headerOptions = new HttpHeaders();
    headerOptions.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    headerOptions.append('Access-Control-Allow-Origin', 'http://localhost:4503');
    headerOptions.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
    headerOptions.append("Content-Type", "application/json");
    this.http.post(this.uploadTextUrl, {id: sessionId, text: recordData}, {headers: headerOptions})
      .subscribe(res => console.log("Response from interaktivdemo", res.valueOf()));
  }
}
