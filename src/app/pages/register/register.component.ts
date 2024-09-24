import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // FORM
  public registerForm!: FormGroup;

  // Placeholder
  public placeholderSerial: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.registerForm = this.fb.group({
      'name': ['', [ Validators.required, Validators.minLength(3) ]],
      'email' : [ '',[ Validators.required, Validators.email ]],
      'password': ['', [ Validators.required, Validators.minLength(6) ]],
    });
  }

  ngOnInit(): void {
  }

  validField( field: string ) {
    return this.registerForm.controls[field].touched &&
      this.registerForm.controls[field].invalid;
  }

  register(): void {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value)
      .subscribe(resp => {
        if ( resp && resp.uid ) {
          this.router.navigateByUrl('/pages/profile');
        } else {
          Swal.fire('Error', resp.message , 'error' );
        }
      });
  }
}
