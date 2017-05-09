import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'journal',
  styles: [],
  template: require('./journal.component.html')()
})
export class JournalComponent implements OnInit {
  public dreams: Array<Object>;
  private results_done: boolean;
  private page: number;

  constructor(public http: Http) {
    this.page = 1;
    this.dreams = [];
    this.http = http;
    this.results_done = false;
  }

  ngOnInit() {
    this.getResults();
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  getResults() {
    return this.http.get(`/api/dream/${this.page}`)
        .map(res => res.json())
        .subscribe(
            data => {
              if (data.dreams.length) {
                this.dreams = this.dreams.concat(data.dreams);
              }else {
                this.results_done = true;
              }
            },
            err => this.logError(err)
        );
  }

  onScrollDown() {
    if (!this.results_done) {
      this.page += 1;
      this.getResults();
    }
  }

}
