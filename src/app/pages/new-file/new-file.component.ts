import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FileService } from '../../services/file.service';

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
    private fileService: FileService,
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
    if (this.newFileForm.invalid || !this.selectedFile) return;

    const formData = new FormData();

    formData.append('name', this.newFileForm.value['name']);
    formData.append('files', this.selectedFile[0]);

    this.fileService.saveNewFile(formData)
      .subscribe( resp => {
        if ( resp && resp.msg ) {
          Swal.fire( 'New file', resp.msg, 'success' );
          this.router.navigateByUrl('/pages/files');
        } else {
          Swal.fire( 'Error', resp.message ?? resp.message[0], 'error' );
        }
      });
    
  }

  // File
  fileSelected(event: any) {
    this.selectedFile = [];
    const files: File[] = Array.from(event.target.files);

    this.selectedFile.push(files[0]);
  }
}
