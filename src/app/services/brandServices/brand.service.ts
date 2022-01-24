import { UpdateBrandRequest } from './../../models/brandModels/updateBrandRequest';
import { CreateBrandRequest } from './../../models/brandModels/createBrandRequest';
import { ListResponseModel } from '../../models/responseModels/listReponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { BrandListModel } from 'src/app/models/brandModels/brandListModel';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl:string="http://localhost:8080/api/brands/"
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<BrandListModel>>{
    return this.httpClient.get<ListResponseModel<BrandListModel>>(this.apiUrl +"getall")
  }

  getById(brandId:number): Observable<SingleResponseModel<BrandListModel>>{ 
    return this.httpClient.get<SingleResponseModel<BrandListModel>>(this.apiUrl+"getbyid/"+brandId)
  }

  add(brand:CreateBrandRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand)
  }

  update(brand:UpdateBrandRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",brand)
  }
 
  delete(id: number): Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+ "delete/" + id)
  }
}
