import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { CreatePromoCodeRequest } from './../../models/promoCodeModels/createPromoCodeRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PromoCodeListModel } from 'src/app/models/promoCodeModels/promoCodeListModel';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {
  apiUrl:string="http://localhost:8080/api/promocodes/"
  constructor(private httpClient:HttpClient) { }

  getByCode(code: string  ): Observable<SingleResponseModel<PromoCodeListModel>> {
    return this.httpClient.get<SingleResponseModel<PromoCodeListModel>>(
      this.apiUrl + 'getbycode/' + code
    );}

  getAll(): Observable<ListResponseModel<PromoCodeListModel>>{ 
    return this.httpClient.get<ListResponseModel<PromoCodeListModel>>(this.apiUrl+"getall")
  }

  getById(id:number): Observable<SingleResponseModel<PromoCodeListModel>>{ 
    return this.httpClient.get<SingleResponseModel<PromoCodeListModel>>(this.apiUrl+"getbyid/"+id)
  }

  add(promoCode:CreatePromoCodeRequest): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+ "add" , promoCode)
  }

  update(promoCode:PromoCodeListModel): Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",promoCode)
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "delete/" + id)
  }
}
