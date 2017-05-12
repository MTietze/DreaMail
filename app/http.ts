import {Injectable} from '@angular/core';
import {Headers, BaseRequestOptions} from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers:Headers = new Headers({
        'X-CSRFToken': CSRF
    });
}