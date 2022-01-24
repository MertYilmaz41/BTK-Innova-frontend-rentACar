import { UpdateColorRequest } from './../../models/colorModels/updateColorRequest';
import { ColorListModel } from './../../models/colorModels/colorListModel';
import { ResponseModel } from './../../models/responseModels/response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/responseModels/listReponseModel';
import { CreateColorRequest } from 'src/app/models/colorModels/createColorRequest';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl:string="http://localhost:8080/api/colors/"
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<ColorListModel>>{
    return this.httpClient.get<ListResponseModel<ColorListModel>>(this.apiUrl +"getall")
  }

  getById(id: number): Observable<SingleResponseModel<ColorListModel>> {
    return this.httpClient.get<SingleResponseModel<ColorListModel>>(this.apiUrl + "getbyid/" + id)
  }

  add(color:CreateColorRequest):Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color)
  }

  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }

  update(color: UpdateColorRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update",color )
  }

}
