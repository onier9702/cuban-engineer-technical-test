import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  // FORM
  public loginForm!: FormGroup;

  // Placeholder
  public placeholderSerial: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      'email' : [ '',[ Validators.required, Validators.email ]],
      'password': ['', [ Validators.required, Validators.minLength(6) ]],
    });
  }

  ngOnInit(): void {
  }

  validField( field: string ) {
    return this.loginForm.controls[field].touched &&
      this.loginForm.controls[field].invalid;
  }

  login(): void {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value)
      .subscribe(resp => {
        if ( resp && resp.uid ) {
          this.router.navigateByUrl('/pages/profile');
        } else {
          Swal.fire('Error', resp.message , 'error' );
        }
      });
  }
}
