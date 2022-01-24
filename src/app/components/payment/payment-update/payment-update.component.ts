import { UpdatePaymentRequest } from './../../../models/paymentModels/updatePaymentRequest';
import { ActivatedRoute } from '@angular/router';
import { PaymentListModel } from './../../../models/paymentModels/paymentListModel';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../../services/paymentServices/payment.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent implements OnInit {
  dataLoaded:boolean=false;
  updatePayment:PaymentListModel;

  constructor(
     private paymentService:PaymentService,
     private toastrService:ToastrService, 
     private activatedRoute:ActivatedRoute) 
     { }

  ngOnInit(): void {
  }

  paymentUpdateForm = new FormGroup({
    rentalId: new FormControl("",[Validators.required]),
    paymentTime: new FormControl("",[Validators.required]),
    totalPaymentAmount: new FormControl("",[Validators.required,Validators.min(0)]),
  })

  clearPaymentUpdateForm() {
    this.paymentUpdateForm.patchValue({
      rentalId: '',   
      paymentTime: '',   
      totalPaymentAmount: '',   
    });
  }

  getById(id:number){
    this.paymentService.getById(id).subscribe(
      (response: SingleResponseModel<PaymentListModel>) => {
        if (response.success) {   
          this.updatePayment=response.data;
          this.paymentUpdateForm.patchValue({
            rentalId:response.data.rentalId,   
            paymentTime:response.data.paymentTime,   
            totalPaymentAmount:response.data.totalPaymentAmount,   
          });
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");

      }
    )
  }

  update(){
    this.dataLoaded = true;
    let paymentModel:UpdatePaymentRequest = Object.assign({},this.paymentUpdateForm.value);
    paymentModel.id=this.updatePayment.id;
    this.paymentService.update(paymentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.clearPaymentUpdateForm();
          this.paymentUpdateForm.markAsUntouched();
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

}
