import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'journal',
  styles: [],
  template: require('./journal.component.html')()
})

export class JournalComponent implements OnInit {
  dreams: Observable<Array<Object>>;
  private results_done: boolean;
  private page: number;
  private search_text = new Subject<string>();

  constructor(public http: Http) {
    this.page = 1;
    this.http = http;
    this.results_done = false;
  }

   search(term: string): void {
    this.search_text.next(term);
  }

  ngOnInit() {
    this.dreams = this.search_text
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term  ? this.getResults(term) : Observable.of<Array<Object>>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Array<Object>>([]);
      });
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  getResults(term: string) {
    return this.http.get(`/api/dream/${this.page}/${term}`)
        .map(res => res.json().dreams);
        // .subscribe(
        //     data => {
        //       if (data.dreams.length) {
        //         this.dreams = this.dreams.concat(data.dreams);
        //       }else {
        //         this.results_done = true;
        //       }
        //     },
        //     err => this.logError(err)
        // );
  }

  onScrollDown() {
    if (!this.results_done) {
      this.page += 1;
      // this.getResults();
    }
  }

}
