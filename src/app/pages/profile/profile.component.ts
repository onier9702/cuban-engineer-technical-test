import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

import { IAuth } from '../../interfaces/auth_interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // USER DATA
  public currentUser!: IAuth;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    // Get current User data
    this.currentUser = this.authService.userProps;
  }

  ngOnInit(): void {
  }

  logout(): void {
 
    this.authService.logout()
      .subscribe( resp => {
        if ( resp && resp.ok ) {
          this.router.navigateByUrl('/pages/login');
        } else {
          Swal.fire('Error', resp.message , 'error' );
        }
      } );
  }

}
