import {Component, ElementRef, Inject, OnInit, OnDestroy} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

declare var jQuery: any;
declare var jQCloud: any;

@Component({
  selector: 'about',
  template: require('./about.component.html')()
})

export default class AboutComponent implements OnInit, OnDestroy {
  public name: string;
  public lexicon: string;
  private elementRef: ElementRef;
  private http: Http;

  constructor(http: Http, @Inject(ElementRef) elementRef: ElementRef) {
    this.name = 'Brunch';
    this.http = http;
    this.elementRef = elementRef;
  }

  

  getLexicon() {
  	let headers = new Headers();
  	headers.append('X-CSRFToken', CSRF);
  	headers.append('Content-Type', 'application/json');
    this.http.get('/api/get_lexicon/',  {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => this.displayCloud(data),
        err => this.logError(err),
        () => console.log('Random Quote Complete')
      );
  }

  logError(err) {
  	console.error('There was an error: ' + err);
  }

  displayCloud(data) {
  	this.lexicon = data.lexicon
		jQuery(this.elementRef.nativeElement).find('.jqcloud').jQCloud(this.lexicon)
  }

  ngOnInit() { console.log('About::ngOnInit'); this.getLexicon()}
  ngOnDestroy() { console.log('About::ngOnDestroy'); }
}
