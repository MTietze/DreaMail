import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'login',
  template: require('./login.component.html')()
})

export class LoginComponent implements OnInit {

  constructor(public http: Http) {
    this.http = http;
  }

  submit() {
    return true;
  }

  ngOnInit() {
    return true;
  }

}
