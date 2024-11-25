import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { FileSelectEvent } from 'primeng/fileupload';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,ButtonModule,RouterModule,InputTextModule,InputNumberModule,CardModule,FileUploadModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export default class ModalComponent {
  productoForm!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedFile: File | null = null;
 

  constructor(
    private fb: FormBuilder,
    private productservice: ProductoService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      _IdProducto: [null],
      _NombreProducto: ['', Validators.required],
      _DescripcionProducto: ['', Validators.required],
      _ModeloProducto: ['', Validators.required],
      _MarcaProducto: ['', Validators.required],
      _ColorProducto: ['', Validators.required],
      _TallaProducto: [1, [Validators.required, Validators.min(1)]]
    });

  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('_IdProducto');
    if (id !=='new') {
      this.edit = true;
      this.getProductById(+id!);
    }
  }

  onFileSelected(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
  }

  getProductById(_IdProducto: number) {
    this.productservice.getProductoById(_IdProducto).subscribe({
      next: (foundProducto) => {this.productoForm.patchValue(foundProducto);},
      error: () => {
        this.messageService.add({severity: 'error',summary: 'Error',detail: 'No encontrado'});
        this.router.navigateByUrl('/');},
    });
  }

  createProducto() {
    if (this.productoForm.invalid) {
      this.messageService.add({severity: 'error',summary: 'Error',detail: 'Revise los campos e intente nuevamente'});
      return;
    }
    if (!this.selectedFile) {
      this.messageService.add({severity: 'error',summary: 'Error',detail: 'Seleccione una imagen e intente nuevamente'});
      return;
    }
    this.isSaveInProgress = true;
    
    this.productservice.createProducto(this.productoForm.value,this.selectedFile).subscribe({
        next: () => {this.messageService.add({severity: 'success',summary: 'Guardado', detail: 'Producto guardado correctamente'});
          this.isSaveInProgress = false;
          this.router.navigateByUrl('/');
        },
        error: () => {this.isSaveInProgress = false;
          this.messageService.add({severity: 'error',summary: 'Error',detail: 'Revise los campos e intente nuevamente'});
        },
      });
  }

  updateProducto() {
    if (this.productoForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.productservice.updateProducto(this.productoForm.value,this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Libro actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente',
        });
      },
    });
  }
  
}