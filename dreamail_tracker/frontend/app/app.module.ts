import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {routing} from './app.routes';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {JournalComponent} from './journal/journal.component';
import {NavBarComponent} from './navbar.component';
import {LoginComponent} from './account/login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        JournalComponent,
        NavBarComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}