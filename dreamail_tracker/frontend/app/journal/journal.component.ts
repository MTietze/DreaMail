import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'new-dream',
  directives: [
    ...FORM_DIRECTIVES
  ],
  pipes: [],
  styles: [],
  template: require('./journal.component.html')()
})
export default class JournalComponent implements OnInit {
  public dreams: Object;
  public message: string;
  private headers: Headers;

  constructor(public http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('X-CSRFToken', CSRF);
    this.headers.append('Content-Type', 'application/json');
  }

  ngOnInit() {
    this.http.get('/api/dream/', {headers: this.headers})
      .map(res => res.json())
      .subscribe(
        data => this.dreams = data.dreams,
        err => this.logError(err)
      );
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

}
