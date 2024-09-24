import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import { IFile } from '../../interfaces/file_interface';
import Swal from 'sweetalert2';

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
  // File
  public file!: IFile;
  public fileId: number;

  // FORM
  public name: FormControl = new FormControl('',[Validators.required, Validators.minLength(3)]);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
  ) {
    this.fileId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchFileByID();
  }

  fetchFileByID(): void {
    this.fileService.findOneFileById(this.fileId).subscribe(resp => {
      if (resp && resp.id) {
        this.file = resp;
        this.name.patchValue(resp.name);
      }
    });
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

    this.fileService.editFileName(this.fileId, this.name.value)
      .subscribe(resp => {
        if ( resp && resp.msg ) {
          Swal.fire('Updated', resp.message , 'success' );
          this.router.navigateByUrl('/pages/files');
        } else {
          Swal.fire('Error', resp.message , 'error' );
        }
      });
  }
}
