import { Observable } from 'rxjs';
import { SegmentListModel } from './../../models/segmentModels/segmentListModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';
import { CreateSegmentRequests } from 'src/app/models/segmentModels/createSegmentRequests';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
  apiUrl:string="http://localhost:8080/api/segments/"
  constructor(private httpClient:HttpClient) { }


  getSegments():Observable<ListResponseModel<SegmentListModel>>{
    return this.httpClient.get<ListResponseModel<SegmentListModel>>(this.apiUrl +"getall")
  }

  add(segment:CreateSegmentRequests):Observable<ResponseModel>{ 
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",segment)
  }


}
