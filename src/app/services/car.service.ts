import { SingleResponseModel } from './../models/singleResponseMode';
import { CarListModel } from './../models/carListModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listReponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl:string="http://localhost:8080/api/cars/"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarListModel>>{
    return this.httpClient.get<ListResponseModel<CarListModel>>(this.apiUrl +"getall")
  }

  getCarsById(carId:number):Observable<SingleResponseModel<CarListModel>>{
    return this.httpClient.get<SingleResponseModel<CarListModel>>(this.apiUrl +"getById")
  }
}
