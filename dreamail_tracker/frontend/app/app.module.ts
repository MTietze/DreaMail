import { RouterModule, Routes } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { FormsModule }   from '@angular/forms';
import {Home} from './home/index';
import {About} from './about/index';
import {Journal} from './journal/index';
import {Login} from './account/login/index';

const appRoutes:Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'journal', component: Journal},
    {path: 'login', component: Login}
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}z