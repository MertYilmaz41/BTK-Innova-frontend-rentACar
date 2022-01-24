import { CreateCityRequest } from './../../models/cityModels/createCityRequests';
import { UpdateCityRequest } from './../../models/cityModels/updateCityRequests';
import { ResponseModel } from './../../models/responseModels/response.model';
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

  getCitiesById(cityId:number):Observable<SingleResponseModel<CityListModel>>{
    return this.httpClient.get<SingleResponseModel<CityListModel>>(this.apiUrl +"getbyid/"+cityId)
  }

  add(city:CreateCityRequest):Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",city)
  }

  delete(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+ "delete/" + id)
  }

  update(id :UpdateCityRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+ "update/", id)
  }


  
}
