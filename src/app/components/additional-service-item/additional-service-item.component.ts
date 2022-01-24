import { ToastrService } from 'ngx-toastr';
import { AdditionalServiceService } from './../../services/iAdditionalService/additional-service.service';
import { Component, OnInit } from '@angular/core';
import { AdditionalServiceItemListModel } from 'src/app/models/additionalServiceItemModels/additionalServiceItemListModel';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-additional-service-item',
  templateUrl: './additional-service-item.component.html',
  styleUrls: ['./additional-service-item.component.css']
})
export class AdditionalServiceItemComponent implements OnInit {

  additionalServiceItemId:number;
  additionalServiceItem:AdditionalServiceItemListModel[]=[];
  dataLoaded:boolean =false;
  constructor(
    private additionalService:AdditionalServiceService, 
    private toastrService:ToastrService) 
    { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll(){
    this.dataLoaded = true;   
    this.additionalService.getAll().subscribe(
      (response: ListResponseModel<AdditionalServiceItemListModel>) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.additionalServiceItem=response.data;
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.dataLoaded = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.dataLoaded = false;
      }
    )
  }


  
   delete (id:number){
    this.additionalService.delete(id).subscribe(response =>{
      if(response.success){     
         this.additionalService.getById(id);
       this.toastrService.success(response.message,"Başarılı");
        
       }else{
         this.toastrService.warning(response.message,"Başarısız");
      }
    }, (errorResponse: HttpErrorResponse) => {       
     this.toastrService.error(errorResponse.message,"Başarısız");
     }
   )

 }


}
