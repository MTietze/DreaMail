import {Component, OnInit, OnDestroy} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

import { WordService} from './word.service';
import {WordWeight} from './word-weight';
const WordCloud = require('wordcloud');

@Component({
  selector: 'about',
  template: require('./about.component.html')(),
  providers: [WordService]
})

export class AboutComponent implements OnInit, OnDestroy {
  protected maxSize:number = 200;

  constructor(public http: Http, private wordService: WordService) {
    this.http = http;
  }

  setText() {
    this.wordService.GetWordsCount().then(data => {
        let scale = data.map((ww) => new WordWeight(ww.word, Math.pow(ww.count,2)));

        let max = scale.map((ww) => ww.count).
            reduce((max, cur) => {
                return Math.max(max, cur);
            }, 0);

        scale = scale.map((ww) => new WordWeight(ww.word, (ww.count / max) * this.maxSize));

        let outarray = scale.map((ww) => [ww.word, ww.count]);

        WordCloud(document.getElementById("my_canvas"), {
            list: outarray,
            gridSize: 1,
            minSize: 0,
            //backgroundColor: '#333300',
            //color: function (word, weight) { return '#000000' }
        });

    });
  }

  logError(err) {
  	console.error('There was an error: ' + err);
  }

  ngOnInit() { this.setText();}
  ngOnDestroy() { console.log(); }
}
