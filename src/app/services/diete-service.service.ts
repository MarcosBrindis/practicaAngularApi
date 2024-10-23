import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diete } from '../models/diete'; 

@Injectable({
  providedIn: 'root'
})
export class DieteServiceService {
  private url:string = 'http://localhost:8000/api/'; 
  private headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient) { }
  


  getDietes(): Observable<Diete[]> {
    let urlApi = this.url + 'diete'
    console.log(urlApi)
    return this.http.get<any[]>(urlApi, {headers: this.headers})
  }
  getDieteById(id: number): Observable<Diete> {
    let urlApi = `${this.url}diete/${id}`;
    return this.http.get<Diete>(urlApi,);
  }
  deleteDiete(id: number): Observable<any> {
    let urlApi = `${this.url}diete/${id}`;
    return this.http.delete(urlApi, { headers: this.headers, responseType: 'text' });
  }
  updateDiete(id: number, diete: Partial<Diete>): Observable<Diete> {
    const urlApi = `${this.url}diete/${id}`;
    return this.http.put<Diete>(urlApi, diete, { headers: this.headers,});
  }
  createDiete(diete: Diete): Observable<Diete> {
    let urlApi = this.url + 'diete'; // Asegúrate de que termina en '/'
    return this.http.post<Diete>(urlApi, diete, { headers: this.headers });
  }
  
}
