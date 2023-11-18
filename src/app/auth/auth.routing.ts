import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'sign-up', loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent) },
      { path: '**', redirectTo: 'sign-up' },
    ]
  },
];
