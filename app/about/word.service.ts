import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {WordWeight} from './word-weight';

@Injectable()
export class WordService {
    private lexicon_url = '/api/get_lexicon/';

    constructor(private http: Http) {}

    public GetWordsCount() {
        let headers = new Headers();
        headers.append('X-CSRFToken', CSRF);
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.lexicon_url, {headers: headers})
            .toPromise()
            .then((result) => {
                            let wws = result.json().lexicon.map((item) => new WordWeight(item.text, item.weight));

                            return wws;
                        });
    }
}
