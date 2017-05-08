import {Component, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'journal',
  directives: [],
  pipes: [],
  styles: [],
  template: require('./journal.component.html')()
})
export class JournalComponent implements OnInit {
  public dreams: Object;
  public message: string;
  private headers: Headers;

  constructor(public http: Http) {
    this.page = 1;
    this.dreams = [];
    this.http = http;
    this.results_done = false
    this.headers = new Headers();
    this.headers.append('X-CSRFToken', CSRF);
    this.headers.append('Content-Type', 'application/json');
  }

  ngOnInit() {
    this.getResults()
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  getResults() {
    return this.http.get(`/api/dream/${this.page}/`, {headers: this.headers})
        .map(res => res.json())
        .subscribe(
            data => {
              if (data.dreams.length)
                this.dreams = this.dreams.concat(data.dreams)
              else
                this.results_done = true
            },
            err => this.logError(err)
        );
  }

  onScrollDown() {
    if(!this.results_done){
      this.page += 1
      this.getResults()
    }
  }

}
