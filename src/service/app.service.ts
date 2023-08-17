import { Injectable } from "@angular/core";
import { HttpClient, HttpParams  } from "@angular/common/http";
import { Observable } from "rxjs";
import { ListadoUsuario } from "../models/usuario.clase";



@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private url = 'https://localhost:7251';

  constructor(private http: HttpClient){}


  obtenerRequerimiento(): Observable<any[]> {
    return this.http.get<any>(`${this.url}/api/usuarios/`);
  }

  obtenerDepa(): Observable<any[]> {
    return this.http.get<any>(`${this.url}/api/usuarios/Departamento`);
  }

  obtenerCargo(): Observable<any[]> {
    return this.http.get<any>(`${this.url}/api/usuarios/Cargos`);
  }


  delete(usuario: string): Observable<ListadoUsuario> {
    return this.http.delete<ListadoUsuario>(`${this.url}/api/usuarios/${usuario}`);
  }

  GuardarUser(listadouser: ListadoUsuario): Observable<ListadoUsuario> {
    return this.http.post<ListadoUsuario>(`${this.url}/api/usuarios`, listadouser);
  }

  EditarUser(listadouser: ListadoUsuario): Observable<ListadoUsuario> {
    return this.http.put<ListadoUsuario>(`${this.url}/api/usuarios`, listadouser );
  }
}



