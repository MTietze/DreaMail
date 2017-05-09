import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {routing} from './app.routes';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {JournalComponent} from './journal/journal.component';
import {NavBarComponent} from './navbar.component';
import {LoginComponent} from './account/login/login.component';
import { RequestOptions, Http, XHRBackend} from '@angular/http';
import {HttpClient} from './http';

function httpClientFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new HttpClient(xhrBackend, requestOptions);
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        InfiniteScrollModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        JournalComponent,
        NavBarComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent],
    providers: [
       { provide: Http, useFactory: httpClientFactory, deps: [XHRBackend, RequestOptions]},
    ],
})
export class AppModule {}