import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../../services/paymentServices/payment.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent implements OnInit {

  dataLoaded:boolean = false;
  constructor(private paymentService:PaymentService, private toastrService:ToastrService) { }

  ngOnInit(): void {
  }
  paymentAddForm = new FormGroup({
    rentalId: new FormControl("",[Validators.required]),
    paymentTime: new FormControl("",[Validators.required]),
    totalPaymentAmount: new FormControl("",[Validators.required,Validators.min(0)]),
  })

  clearPaymentAddForm() {
    this.paymentAddForm.patchValue({
      rentalId: '',   
      paymentTime: '',  
      totalPaymentAmount: '',  
    });
  }

  add(){
    this.dataLoaded = true;
    let paymentModel = Object.assign({},this.paymentAddForm.value);
    this.paymentService.add(paymentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {               
          this.dataLoaded = false;
          this.clearPaymentAddForm();
          this.paymentAddForm.markAsUntouched();
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
