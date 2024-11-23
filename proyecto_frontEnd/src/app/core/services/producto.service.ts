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
  getProductoById(idProducto:number): Observable<producto>{
    return this.http.get<producto>('${this.apiUrl}/${idProducto}');
  }

  //crear producto
  createProducto(producto:producto):Observable<producto>{
    return this.http.post<producto>(this.apiUrl, producto)
  }

  //Actualizar producto
  updateProducto(producto:producto){
    return this.http.put(this.apiUrl, producto)
  }

  //eliminar producto
  deleteProducto(idProducto:number){
    return this.http.delete<producto>('${this.apiUrl}/${idProducto}');
  }
}
