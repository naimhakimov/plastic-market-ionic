import {Injectable} from '@angular/core';
import {HTTP} from '@awesome-cordova-plugins/http/ngx';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    public httpNative: HTTP,
    public platform: Platform,
    public http: HttpClient) {
  }

  get(url: string, parameters: any = {}): Observable<any> {
    if (this.platform.is('android') || this.platform.is('ios')) {
      return from(this.httpNative.get(url, parameters, {}));
    } else {
      return this.http.get(url, parameters);
    }
  }

  post(url: string, parameters: any = {}): Observable<any> {
    if (this.platform.is('android') || this.platform.is('ios')) {
      return from(this.httpNative.post(url, parameters, {}));
    } else {
      return this.http.post(url, parameters);
    }
  }

  getData(data: any): any {
    let newData = data;
    if (this.platform.is('android') || this.platform.is('ios')) {
      newData = JSON.parse(data.data);
    }
    return newData;
  }

}
