import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Car } from '../models/car';

@Injectable({ //para deixar acessível em todo o projeto essa service
  providedIn: 'root'
})

export class CarService {
  url = 'http://localhost:3000/cars'; // api rest fake

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //pegando todos
  getCarros(): Observable<Car[]>{
    return this.httpClient.get<Car[]>(this.url).
    pipe(
      retry(2), //vai tentar 2x caso falhe
      catchError(this.handleError)
    )
  }

  //pegando pelo id
  getCarById(id:  number): Observable<Car>{
    return this.httpClient.get<Car>(this.url + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //salvando um carro
  saveCar(car: Car): Observable<Car>{ //stringify converte o que tá vindo pra json
    return this.httpClient.post<Car>(this.url, JSON.stringify(car), this.httpOptions) 
    .pipe(
      retry(2),
      catchError(this.handleError)  
    )
  }

  updateCar(car: Car): Observable<Car>{
    return this.httpClient.put<Car>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)  
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteCar(car: Car){
    return this.httpClient.delete<Car>(this.url + '/' + car.id + this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //manipulação de erro;
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      // Erro ocorreu no lado do client (front)
      errorMessage = error.error.message;
    } else {
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    } 
    console.log(errorMessage);
    return throwError(errorMessage);
  };

   
}
