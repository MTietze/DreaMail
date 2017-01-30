import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'new-dream',
  directives: [],
  pipes: [],
  styles: [],
  template: require('./home.component.html')()
})
export class HomeComponent implements OnInit {
  public dream: Object;
  public message: string;
  private headers: Headers;

  constructor(public http: Http) {
    this.dream = { date: new Date(Date.now()).toISOString().slice(0, 10)};
    this.http = http;
    this.headers = new Headers();
    this.headers.append('X-CSRFToken', CSRF);
    this.headers.append('Content-Type', 'application/json');
  }

  onSubmit(form: any): void {
    let post_data = JSON.stringify(this.dream);
    this.http.post('/api/dream/', post_data, {headers: this.headers})
      .map(res => res.json())
      .subscribe(
        data => this.message = data.message,
        err => this.logError(err)
      );
  }

  ngOnInit() {}

  logError(err) {
   console.error('There was an error: ' + err);
  }

}
