import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./templates/pages/main/main.component').then(m => m.MainComponent),
    children: [
      { path: 'reactive', loadChildren: () => import('./reactive/reactive.routing').then(m => m.routes) },
      { path: 'auth', loadChildren: () => import('./auth/auth.routing').then(m => m.routes) },
      { path: '**', redirectTo: 'reactive' },
    ],
  }
];
