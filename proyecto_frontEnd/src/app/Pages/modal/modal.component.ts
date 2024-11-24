import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,FormsModule,MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export default class ModalComponent {

   //formgroup para formulario
   productoForm: FormGroup;

   //FormControl para la validacion de los campos
   color: FormControl;
   marca: FormControl;
   modelo: FormControl;
   nombre: FormControl;
   descripcion: FormControl;
   talla: FormControl;
 
 
   constructor(public _matDialogRef:MatDialogRef<ModalComponent>){
 
     // inicializamos los campos del formulario y le asignamos las validaciones correspondiente
     this.color = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
     this.marca = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
     this.modelo = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
     this.nombre = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
     this.descripcion = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(200)]);
     this.talla = new FormControl(0,[Validators.required,Validators.min(1), Validators.max(70)]);
 
     //inicializamos el formulario
     this.productoForm = new FormGroup({
       color  : this.color,
       marca  : this.marca,
       modelo : this.modelo,
       nombre : this.nombre,
       descripcion : this.descripcion,
       talla : this.talla
     });
   }
 
   //metodo
   handleSubmit():void{
     console.log(this.productoForm);
     this.productoForm.reset();
   }
}
