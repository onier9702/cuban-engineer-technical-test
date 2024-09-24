import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Limit } from '../../enum/enums';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from "../../shared/pagination/pagination.component";

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
  public files: any[] = [];

  // PAGINATION
  public limit: number = Limit.SIX;
  public offset: number = 0;
  public total: number = 0;
  // TODO: remember to change to true
  public isLoading: boolean = false;

  // FILTERS
  public filtersOpen: boolean = false;
  public filters: any = {};
  public isActiveFilters: boolean = false;
  public searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      'name': ['', [] ],
      'status': ['', [] ],
    });

    this.fetchAllFiles();
  }

  // // FETCH ALL PRODUCTS PAGINATED
  fetchAllFiles(): void {
    // this.filesService.fetchAllFilesPaginated(this.limit, this.offset, this.filters)
    //   .subscribe( resp => {
    //     if (resp && resp.count >= 0) {
    //       this.total = resp.count;
    //       this.files = resp.files;
    //     }

    //     this.isLoading = false;
    //   });
  }

  // FILTERS
  openCloseFilters(): void {
    this.filtersOpen = !this.filtersOpen;
  }

  searchFormSubmit(): void {
    this.filters = this.searchForm.value;
    
    // Set offset to 0 to allow pagination by filters
    this.offset = 0;
    this.isActiveFilters = true;
    this.fetchAllFiles();
  }

  restartFilters(): void {
    // Set offset to 0 to allow pagination by filters
    this.offset = 0;
    this.isActiveFilters = false;
    this.filters = {};
    this.searchForm.reset();
    this.fetchAllFiles();
  }

  // DETECT CHANGE PAGE
  detectChangeOffset(offset: number) {
    this.isLoading = true;
    this.offset = offset;

    this.fetchAllFiles();
  }

  removeOneFile(file: any): void {

    // // Mat Dialog solution
    // let dialogRef = this.dialog.open( ModalConfirmComponent, {
    //   width: '35rem',
    //   height: '22rem',
    //   autoFocus: false,
    //   data: `¿Estás seguro/a de que deseas eliminar este producto: ${product.name} ?`
    // } );

    // dialogRef.updatePosition({ top: '100px' });
    // dialogRef.afterClosed().subscribe( resp => {
    //   if ( resp ) { // user confirm Cancel or Continue
    //     this.productService.removeOneProductById(product.id)
    //       .subscribe( (resp: any) => {
    //         if ( resp && resp.msg ) {
    //           Swal.fire('Removido', resp.msg, 'success');
    //           this.fetchAllProducts();
    //         } else {
    //           Swal.fire('Error', resp.message , 'error' );
    //         };
    //       });
    //   };
    // });

  }
}
