import {Component} from '@angular/core';
import {Routes, Route, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {FORM_PROVIDERS, Location} from '@angular/common';

import {Home} from './home';
import {About} from './about';
import {Journal} from './journal';
import {NavBar} from './navbar.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, NavBar],
  pipes: [],
  styles: [`
    :host {
      font-family: sans-serif;
    }
    header, footer, main {
      margin: 0 1em;
    }
    footer {
      margin-top: 1em;
      border-top: 1px solid #ccc;
      padding-top: 0.5em;
    }
  `],
  template: `
    <header>
      <h1>Welcome to {{ name }}</h1>
    </header>
    <navbar></navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      DreaMail dream journal and metrics by <a [href]="url" target="_blank">Max Tietze</a>
    </footer>
  `
})
@Routes([
  new Route({path: '', component: Home}),
  new Route({path: 'about', component: About}),
  new Route({path: 'journal', component: Journal})
])
export class App {
  name: string = 'DreaMail';
  url: string = 'https://github.com/MTietze';
  constructor(public loc: Location) {
    if(ANGULAR_PATH){
      loc.go(ANGULAR_PATH)
    }
  }
}
