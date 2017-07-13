import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'navbar',
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