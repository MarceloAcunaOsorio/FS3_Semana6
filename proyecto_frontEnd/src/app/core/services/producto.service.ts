import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { producto } from '../../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8085/api/home';

  constructor(private http:HttpClient) { }

  //listar producto
  getProducto():Observable<producto[]>{
    return this.http.get<producto[]>(this.apiUrl)
  }


  //id del producto
  getProductoById(_idProducto:number): Observable<producto>{
    return this.http.get<producto>('${this.apiUrl}/${_idProducto}');
  }


  //crear producto
 private apUrl  = 'http://localhost:8085/admin/crearproducto'
  createProducto(producto: producto): Observable<producto> {
    return this.http.post<producto>(this.apUrl,producto)
  }
  

  //Actualizar producto
  private apUrls ='http://localhost:8085/admin/actualizar'
  updateProducto(producto: producto){
    return this.http.put(this.apUrls, producto)
  }

  //eliminar producto
  deleteProducto(idProducto:number){
    return this.http.delete<producto>('${this.apiUrl}/${idProducto}');
  }
}
