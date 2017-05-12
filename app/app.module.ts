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
import {RequestOptions} from '@angular/http';
import {DefaultRequestOptions} from './http';

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
       { provide: RequestOptions, useClass: DefaultRequestOptions},
    ],
})
export class AppModule {}