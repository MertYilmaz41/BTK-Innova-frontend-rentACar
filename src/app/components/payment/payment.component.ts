import { PaymentListModel } from './../../models/paymentModels/paymentListModel';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../services/paymentServices/payment.service';
import { Component, OnInit } from '@angular/core';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService, private toastrService:ToastrService) { }
  payments:PaymentListModel[]=[];
  dataLoaded:boolean=false;
  deleteLoading:boolean=false;
  searchTerm:string='';
  ngOnInit(): void {
  }

  getAll(){
    this.dataLoaded = true;   
    this.paymentService.getAll().subscribe(
      (response: ListResponseModel<PaymentListModel>) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.payments=response.data;
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
    this.paymentService.delete(id).subscribe(
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
