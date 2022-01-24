import { UpdateCarRequest } from './../../models/carModels/updateCarRequest';
import { CarListModel } from './../../models/carModels/carListModel';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { CreateCarRequest } from './../../models/carModels/createCarRequest';
import { SingleResponseModel } from '../../models/responseModels/singleResponseMode';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../../models/responseModels/listReponseModel';
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

  getById(carId:number): Observable<SingleResponseModel<CarListModel>>{ 
    return this.httpClient.get<SingleResponseModel<CarListModel>>(this.apiUrl+"getbyid/"+carId)
  }

  add(car:CreateCarRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",car)
  }

  update(car:UpdateCarRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",car)
  }

  delete(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+ "delete/" + id)
  }
}
