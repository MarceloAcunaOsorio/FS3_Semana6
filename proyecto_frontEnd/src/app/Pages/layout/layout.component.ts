import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { producto } from '../../models/producto';
import { ProductoService } from '../../core/services/producto.service';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterModule,CardModule,ButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

  producto: producto[] = []

  constructor(private productoService: ProductoService){}

 ngOnInit():void{
  this.getAllProductos();
 }

 //funcion para obtener todos los productos
 getAllProductos(){
  this.productoService.getProducto().subscribe((data)=> {
    this.producto = data;
  });
 }


}
