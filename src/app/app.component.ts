import { Component } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  encryptData: any;
  bruteforceData: any;
  baseUrl: string;

  constructor(private _http: Http) {
    this.baseUrl = 'http://localhost:3000';
    this.encryptData = { plainText: '', secret: '', cipher: '' };
    this.bruteforceData = { cipherText: '', plainText: '', keyLength: '', algorithm:'aes192' };
  }

  encrypt() {
    this._http.post(this.baseUrl + '/api/encrypt', this.encryptData)
      .map(res => res.json()).subscribe(
      res => {
        console.log('res 1 >>>', res);
        this.encryptData.cipher = res.cipher;
      },
      err => {
        console.log('err 1 >>>', err);
      }
      )
  }

  bruteforce() {
    console.log(this.bruteforceData);
    this._http.post(this.baseUrl + '/api/bruteforce', this.bruteforceData)
      .map(res => res.json()).subscribe(
      res => {
        console.log('res 2 >>>', res);
      },
      err => {
        console.log('err 2>>>', err);
      }
      )
  }
}
