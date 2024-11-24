import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private ApiUrl = "http://localhost:8085/api/register"
  constructor(private http:HttpClient) { }


//crear usuario
createUsuario(usuario:usuario):Observable<usuario>{
return this.http.post<usuario>(this.ApiUrl, usuario)
}

}


