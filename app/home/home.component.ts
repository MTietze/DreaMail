import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'new-dream',
  styles: [],
  template: require('./home.component.html')()
})
export class HomeComponent implements OnInit {
  public dream: Object;
  public message: string;

  constructor(public http: Http) {
    this.dream = { date: this.dateInputValue()};
    this.http = http;
  }

  onSubmit(form: any): void {
    let post_data = JSON.stringify(this.dream);
    this.http.post('/api/dream/', post_data)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.message,
        err => this.logError(err)
      );
  }

  dateInputValue(): string {
    let local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  ngOnInit() {}

  logError(err) {
   console.error('There was an error: ' + err);
  }

}
