import { RentalListModel } from './../../models/rentalModels/rentalListModel';
import { UpdateRentalRequest } from './../../models/rentalModels/updateRentalRequest';
import { CreateRentalRequestForCorporateCustomer } from './../../models/rentalModels/createRentalRequestForCorporateCustomer';
import { CreateRentalRequestForIndividualCustomer } from './../../models/rentalModels/createRentalRequestForIndividualCustomer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl:string="http://localhost:8080/api/rentals/"
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<RentalListModel>>{
    return this.httpClient.get<ListResponseModel<RentalListModel>>(this.apiUrl +"getall")
  }

  getById(id:number): Observable<SingleResponseModel<RentalListModel>>{ 
    return this.httpClient.get<SingleResponseModel<RentalListModel>>(this.apiUrl+"getbyid/"+id)
  }

  addForIndividualCustomer(rental:CreateRentalRequestForIndividualCustomer):Observable<ResponseModel>
  { 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add/individualcustomer",rental)
  }

  addForCorporateCustomer(rental:CreateRentalRequestForCorporateCustomer):Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add/corporatecustomer",rental)
  }

  update(rental:UpdateRentalRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",rental)
  }

  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }
}
