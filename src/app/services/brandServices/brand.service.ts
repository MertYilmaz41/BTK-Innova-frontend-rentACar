import { CreateBrandRequest } from './../../models/brandModels/createBrandRequest';
import { ListResponseModel } from '../../models/responseModels/listReponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { BrandListModel } from 'src/app/models/brandModels/brandListModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl:string="http://localhost:8080/api/brands/"
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<BrandListModel>>{
    return this.httpClient.get<ListResponseModel<BrandListModel>>(this.apiUrl +"getall")
  }

  add(brand:CreateBrandRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand)
  }

 
}
