import { ColorListModel } from './../../models/colorModels/colorListModel';
import { ResponseModel } from './../../models/responseModels/response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/responseModels/listReponseModel';
import { CreateColorRequest } from 'src/app/models/colorModels/createColorRequest';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl:string="http://localhost:8080/api/colors/"
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<ColorListModel>>{
    return this.httpClient.get<ListResponseModel<ColorListModel>>(this.apiUrl +"getall")
  }

  add(color:CreateColorRequest):Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color)
  }


}
