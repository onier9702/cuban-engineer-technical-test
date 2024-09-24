import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-file',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './new-file.component.html',
  styleUrl: './new-file.component.scss'
})
export class NewFileComponent {

  // Files
  public selectedFile: File[] = []; 

  // FORM
  public newFileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.newFileForm = this.fb.group({
      'name' : [ '',[ Validators.required, Validators.minLength(3) ]],
      // add others properties in future as needed
    });
  }

  ngOnInit(): void {
  }

  returnToFilesList(): void {
    this.router.navigateByUrl('/pages/files');
  }

  validField( field: string ) {
    return this.newFileForm.controls[field].touched &&
      this.newFileForm.controls[field].invalid;
  }

  saveFile(): void {
    if (this.newFileForm.invalid) return;

    console.log(this.newFileForm.value);
    // this.authService.login(this.loginForm.value)
    //   .subscribe(resp => {
    //     if ( resp && resp.uid ) {
    //       this.router.navigateByUrl('/auth/profile');
    //     } else {
    //       Swal.fire('Error', resp.message , 'error' );
    //     }
    //   });
  }

  // File
  fileSelected(event: any) {
    this.selectedFile = [];
    const files: File[] = Array.from(event.target.files);
    console.log(files);

    this.selectedFile.push(files[0]);
  }
}
