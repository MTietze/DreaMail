import {Component, OnInit, OnDestroy} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'about',
  template: require('./about.component.html')()
})

export class AboutComponent implements OnInit, OnDestroy {
  public name: string;
  public lexicon: string;

  constructor(public http: Http) {
    this.name = 'Brunch';
    this.http = http;
  }



  getLexicon() {
  	let headers = new Headers();
  	headers.append('X-CSRFToken', CSRF);
  	headers.append('Content-Type', 'application/json');
    this.http.get('/api/get_lexicon/',  {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => this.lexicon = data.lexicon,
        err => this.logError(err),
        () => console.log('Random Quote Complete')
      );
  }

  logError(err) {
  	console.error('There was an error: ' + err);
  }

  ngOnInit() { console.log('About::ngOnInit'); this.getLexicon()}
  ngOnDestroy() { console.log('About::ngOnDestroy'); }
}
