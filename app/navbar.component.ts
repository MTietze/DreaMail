import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'navbar',
  directives: [],
  styles: [`
    nav ul {
      list-style-type: none;
      margin: 1em 0;
      padding: 0 1em;
      border-top: 1px solid #069;
      border-bottom: 1px solid #069;
    }
    nav li {
      display: inline-block;
      padding: 0;
    }
    nav a {
      color: #069;
      text-decoration: none;
      padding: 0.5em;
      display: inline-block;
    }
    nav .active {

      background-color: #069;
      color: #fff;
    }
  `],
  template: `
    <nav>
      <ul>
        <li>
          <a [routerLink]="['']" [class.active]="isActive('/')">New Entry</a>
        </li>
        <li>
          <a [routerLink]="['about']" [class.active]="isActive('/about')">Metrics</a>
        </li>
        <li>
          <a [routerLink]="['journal']" [class.active]="isActive('/journal')">Journal</a>
        </li>
      </ul>
    </nav>
  `
})
export class NavBarComponent {
  constructor(public loc: Location) {}

  isActive(path: string) {
    return (this.loc.path() || '/') === path;
  }
}