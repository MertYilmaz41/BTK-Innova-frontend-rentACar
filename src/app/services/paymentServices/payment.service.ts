import { UpdatePaymentRequest } from './../../models/paymentModels/updatePaymentRequest';
import { CreatePaymentRequest } from './../../models/paymentModels/createPaymentRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { PaymentListModel } from 'src/app/models/paymentModels/paymentListModel';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl:string="http://localhost:8080/api/payments/"
  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<ListResponseModel<PaymentListModel>>{ 
    return this.httpClient.get<ListResponseModel<PaymentListModel>>(this.apiUrl+"getall")
  }

  getById(id:number): Observable<SingleResponseModel<PaymentListModel>>{ 
    return this.httpClient.get<SingleResponseModel<PaymentListModel>>(this.apiUrl+"getbyid/"+id)
  }

  add(payment:CreatePaymentRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",payment);
  }

  update(paymentModel:UpdatePaymentRequest): Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",paymentModel)
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }
}
