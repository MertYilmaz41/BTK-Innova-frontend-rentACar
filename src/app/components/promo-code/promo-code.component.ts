import { PromoCodeListModel } from './../../models/promoCodeModels/promoCodeListModel';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PromoCodeService } from 'src/app/services/promoCodeServices/promo-code.service';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css']
})
export class PromoCodeComponent implements OnInit {

  constructor(
    private promoCodeService:PromoCodeService,
    private toastrService:ToastrService) 
    { }
    promoCodes:PromoCodeListModel[]=[];
    dataLoaded:boolean = false;
    searchTerm:string='';
    deleteLoading=false;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.dataLoaded = true;   
    this.promoCodeService.getAll().subscribe(
      (response: ListResponseModel<PromoCodeListModel>) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.promoCodes=response.data;
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

  delete(id:number){
    this.deleteLoading = true;   
    this.promoCodeService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.deleteLoading = false;
          this.getAll();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.deleteLoading = false;
      }
    )
  }

}
