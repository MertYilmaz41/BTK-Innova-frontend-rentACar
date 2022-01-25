import { CustomerCardDetailListModel } from './../../models/customerCardDetailModels/customerCardDetailListModel';
import { UpdateCustomerCardDetailRequest } from './../../models/customerCardDetailModels/updateCustomerCardDetailRequest';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { CreateCustomerCardDetailRequest } from './../../models/customerCardDetailModels/createCustomerCardDetailRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerCardDetailService {
  apiUrl:string="http://localhost:8080/api/customercarddetails/"
  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<ListResponseModel<CustomerCardDetailListModel>> {
    return this.httpClient.get<ListResponseModel<CustomerCardDetailListModel>>(this.apiUrl + "getall")
  }

  getById(id: number): Observable<SingleResponseModel<CustomerCardDetailListModel>> {
    return this.httpClient.get<SingleResponseModel<CustomerCardDetailListModel>>(this.apiUrl + "getbyid/" + id)
  }

  add(customerCarDetail:CreateCustomerCardDetailRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",customerCarDetail)
  }

  update(customerCardDetail: UpdateCustomerCardDetailRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update",customerCardDetail )
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }
}
