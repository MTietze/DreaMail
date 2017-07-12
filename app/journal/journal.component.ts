import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';

@Component({
  selector: 'journal',
  styles: [],
  template: require('./journal.component.html')()
})

export class JournalComponent implements OnInit {
  dreams: Observable<Array<Object>>;
  page: number = 1;
  terms: string = '';
  private loading: boolean;
  private searchTermStream = new BehaviorSubject<string>('');
  private pageStream = new Subject<number>();

  constructor(public http: Http) {
    this.http = http;
    this.loading = false;
  }

  ngOnInit() {
    const pageSource = this.pageStream
      .map(pageNum => {
        return { search: this.terms, page: pageNum };
      });
    const searchSource = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .map(searchTerm => {
        return {search: searchTerm, page: this.page};
      });
    this.dreams = pageSource
      .merge(searchSource)
      .mergeMap((params: {search: string, page: number}) => this.getResults(params.search, params.page))
      .scan((acc, curr) => this.page > 1 ? acc.concat(curr) : curr, [])
      .share()
    this.dreams.subscribe( () => this.loading = false);
  }

  getResults(term: string, page: number) {
    return this.http.get(`/api/dream/${page}/${term}`)
        .map(res => res.json().dreams);
  }

  onScrollDown() {
    if (!this.loading) {
      this.loading = true;
      this.page += 1;
      this.pageStream.next(this.page);
    }
  }

  search(term: string): void {
    this.terms = term;
    this.page = 1;
    this.searchTermStream.next(term);
  }

}
