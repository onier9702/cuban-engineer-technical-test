import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-file',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './update-file.component.html',
  styleUrl: './update-file.component.scss'
})
export class UpdateFileComponent {
  // Files
  public selectedFile: File[] = []; 

  // FORM
  public name: FormControl = new FormControl('',[Validators.required, Validators.minLength(3)]);

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  returnToFilesList(): void {
    this.router.navigateByUrl('/pages/files');
  }

  validField() {
    return this.name.touched &&
      this.name.invalid;
  }

  updateFile(): void {
    if (this.name.invalid) return;

    console.log(this.name.value);
    // this.authService.login(this.loginForm.value)
    //   .subscribe(resp => {
    //     if ( resp && resp.uid ) {
    //       this.router.navigateByUrl('/auth/profile');
    //     } else {
    //       Swal.fire('Error', resp.message , 'error' );
    //     }
    //   });
  }
}
