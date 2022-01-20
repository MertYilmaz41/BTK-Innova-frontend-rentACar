import { CityListModel } from './../../models/cityModels/cityListModel';
import { ListResponseModel } from './../../models/responseModels/listReponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiUrl:string="http://localhost:8080/api/cities/"
  constructor(private httpClient:HttpClient) { }


  getCities():Observable<ListResponseModel<CityListModel>>{
    return this.httpClient.get<ListResponseModel<CityListModel>>(this.apiUrl+"getall")
  }

  getCitiesById(carId:number):Observable<SingleResponseModel<CityListModel>>{
    return this.httpClient.get<SingleResponseModel<CityListModel>>(this.apiUrl +"getById")
  }
}
