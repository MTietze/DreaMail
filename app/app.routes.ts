import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {JournalComponent} from './journal/journal.component';
import {LoginComponent} from './account/login/login.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'journal', component: JournalComponent},
    {path: 'login', component: LoginComponent},
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);