import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {WordWeight} from './word-weight';

@Injectable()
export class WordService {
    private lexicon_url = '/api/get_lexicon/';

    constructor(private http: Http) {}

    public GetWordsCount() {
        return this.http.get(this.lexicon_url)
            .toPromise()
            .then((result) => {
                            let wws = result.json().lexicon.map((item) => new WordWeight(item.text, item.weight));

                            return wws;
                        });
    }
}
