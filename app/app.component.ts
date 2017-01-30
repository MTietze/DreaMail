import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {NavBarComponent} from './navbar.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
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
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <footer>
      DreaMail dream journal and metrics by <a [href]="url" target="_blank">Max Tietze</a>
    </footer>
  `
})

export class AppComponent {
  name: string = 'DreaMail';
  url: string = 'https://github.com/MTietze';
  constructor(public loc: Location) {
    this.loc = loc;
    if(ANGULAR_PATH) {
      loc.go(ANGULAR_PATH)
    }
  }
}