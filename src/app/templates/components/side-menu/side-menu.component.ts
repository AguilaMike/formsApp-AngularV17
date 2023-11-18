import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'main-side-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  public menus: MenuItem[] = [
    {
      title: 'Reactive',
      icon: 'bi bi-ui-checks-grid',
      path: 'reactive',
      children: [
        { title: 'Basicos', icon: 'bi bi-columns', path: 'reactive/basic' },
        { title: 'Dinamicos', icon: 'bi bi-columns-gap', path: 'reactive/dynamic' },
        { title: 'Switches', icon: 'bi bi-command', path: 'reactive/switches' },
      ],
    },
    {
      title: 'Validaciones',
      icon: 'bi bi-list-check',
      path: 'auth',
      children: [
        // { title: 'Login', icon: 'fa fa-fw fa-dashboard', path: 'auth/login' },
        { title: 'Registro', icon: 'bi bi-box-arrow-in-right', path: 'auth/sign-up' },
      ],
    },
  ];

}
