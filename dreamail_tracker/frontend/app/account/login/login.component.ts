import {Component, OnInit, OnDestroy} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'login',
  template: require('./login.component.html')()
})

export default class LoginComponent {

  constructor(public http: Http) {
    this.http = http;
  }

  submit(){
  }

}
