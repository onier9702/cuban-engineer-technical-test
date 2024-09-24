import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  constructor(
    private menuService: MenuService,
  ) {}

  ngOnInit(): void {
    this.menu = this.menuService.menu;
  }

}
