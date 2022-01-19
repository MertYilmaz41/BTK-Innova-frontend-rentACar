import { ColorListModel } from './../models/colorListModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listReponseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl:string="http://localhost:8080/api/colors/"
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<ColorListModel>>{
    return this.httpClient.get<ListResponseModel<ColorListModel>>(this.apiUrl +"getall")
  }
}
