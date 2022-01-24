import { UpdateAdditionalServiceItemRequest } from './../../models/additionalServiceItemModels/updateAdditionalServiceItemRequest';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { CreateAdditionalServiceItemRequest } from './../../models/additionalServiceItemModels/createAdditionalServiceItemRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalServiceItemListModel } from 'src/app/models/additionalServiceItemModels/additionalServiceItemListModel';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceService {
  apiUrl:string="http://localhost:8080/api/additionalservices/"
  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<ListResponseModel<AdditionalServiceItemListModel>> {
    return this.httpClient.get<ListResponseModel<AdditionalServiceItemListModel>>(this.apiUrl + "getall")
  }

  getById(id: number): Observable<SingleResponseModel<AdditionalServiceItemListModel>> {
    return this.httpClient.get<SingleResponseModel<AdditionalServiceItemListModel>>(this.apiUrl + "getbyid/" + id)
  }

  add(additionalService:CreateAdditionalServiceItemRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",additionalService)
  }

  update(additionalServiceItem: UpdateAdditionalServiceItemRequest): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "update",additionalServiceItem )
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }
}
