import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Limit } from '../../enum/enums';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from "../../shared/pagination/pagination.component";
import { FileService } from '../../services/file.service';
import { IFile } from '../../interfaces/file_interface';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PaginationComponent
],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent {
  
  //  Files
  public files: IFile[] = [];

  // PAGINATION
  public limit: number = Limit.SIX;
  public offset: number = 0;
  public total: number = 0;
  public isLoading: boolean = true;

  constructor(
    private readonly fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.fetchAllFiles();
  }

  // FETCH ALL FILES PAGINATED
  fetchAllFiles(): void {
    this.fileService.fetchAllFilesPaginated(this.limit, this.offset)
      .subscribe( resp => {
        if (resp && resp.count >= 0) {
          this.total = resp.count;
          this.files = resp.files;
        }

        this.isLoading = false;
      });
  }

  downloadFile(fileId: number): void {
    this.fileService.downloadFile(+fileId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `file_${fileId}.zip`; // Set the filename here
        a.click();
        window.URL.revokeObjectURL(url); // Clean up URL after the download
      },
      error: (err) => {
        console.error('Error downloading the file', err);
      },
      complete: () => {
        console.log('File downloaded complete');
      }
    });
  }

  // DETECT CHANGE PAGE
  detectChangeOffset(offset: number) {
    this.isLoading = true;
    this.offset = offset;

    this.fetchAllFiles();
  }

}
