import { CustomerCardDetailListModel } from './../../models/customerCardDetailModels/customerCardDetailListModel';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CustomerCardDetailService } from 'src/app/services/customerCardDetailServices/customer-card-detail.service';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-card-detail',
  templateUrl: './customer-card-detail.component.html',
  styleUrls: ['./customer-card-detail.component.css']
})
export class CustomerCardDetailComponent implements OnInit {
  customerId:number;
  customerCardDetails:CustomerCardDetailListModel[]=[];
  dataLoaded:boolean=false;

  constructor(private customerCardDetailService: CustomerCardDetailService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.dataLoaded = true;   
    this.customerCardDetailService.getAll().subscribe(
      (response: ListResponseModel<CustomerCardDetailListModel>) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.customerCardDetails=response.data;
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



  // delete (id:number){
  //   this.customerCardDetailService.delete(id).subscribe(response =>{
  //     if(response.success){     
  //       this.findAllCustomerCardDetailsByCustomerId();
  //       this.toastrService.success(response.message,"Başarılı");
        
  //     }else{
  //       this.toastrService.warning(response.message,"Başarısız");
     
  //     }
  //   }, (errorResponse: HttpErrorResponse) => {       
  //     this.toastrService.error(errorResponse.message,"Başarısız");
  //   }
  //   )

  // }

}
