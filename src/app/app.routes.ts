import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { ContactList } from './contacts/contact-list/contact-list';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactList }
];

export const appRouter = provideRouter(routes);
