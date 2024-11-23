import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crea-producto',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './crea-producto.component.html',
  styleUrl: './crea-producto.component.css'
})
export class CreaProductoComponent {

  //formgroup para formulario
  productoForm: FormGroup;

  //FormControl para la validacion de los campos
  color: FormControl;
  marca: FormControl;
  modelo: FormControl;
  nombre: FormControl;
  descripcion: FormControl;
  talla: FormControl;


  constructor(){

    // inicializamos los campos del formulario
    this.color = new FormControl('');
    this.marca = new FormControl('');
    this.modelo = new FormControl('');
    this.nombre = new FormControl('');
    this.descripcion = new FormControl('');
    this.talla = new FormControl(0);

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


}
