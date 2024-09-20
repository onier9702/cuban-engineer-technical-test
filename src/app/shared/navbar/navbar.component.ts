import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  // MENU
  public menu!: any[];

  // ROUTES
  public currentRoute: string = '';
  public indexRouteSelected: number = 0;
  // public routes: string[] = [
  //   '/pages/home',
  //   '/pages/join-us',
  //   '/pages/products',
  //   '/pages/about-us',
  //   '/pages/contact-us',
  //   '/auth/login',
  //   '/admin',
  // ];

  constructor(
    private router: Router,
    private menuService: MenuService,
    // private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.menu = this.menuService.menu;
  }

}
