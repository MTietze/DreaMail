import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'journal',
  styles: [],
  template: require('./journal.component.html')()
})

export class JournalComponent implements OnInit {
  public dreams: Array<Object>;
  public search_text: string;
  public modelChanged: Subject<string> = new Subject<string>();
  private results_done: boolean;
  private page: number;

  constructor(public http: Http) {
    this.page = 1;
    this.dreams = [];
    this.http = http;
    this.results_done = false;
    this.search_text = '';
    this.modelChanged
            .debounceTime(300) // wait 300ms after the last event before emitting last event
            .distinctUntilChanged() // only emit if value is different from previous value
            .subscribe(this.getResults);
  }

  changed(text: string) {
      this.modelChanged.next(text);
  }

  ngOnInit() {
    this.getResults();
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  getResults() {
    return this.http.get(`/api/dream/${this.page}/${this.search_text}`)
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
