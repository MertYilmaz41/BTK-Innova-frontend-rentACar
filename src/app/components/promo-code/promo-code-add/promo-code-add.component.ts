import { ToastrService } from 'ngx-toastr';
import { PromoCodeService } from './../../../services/promoCodeServices/promo-code.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-promo-code-add',
  templateUrl: './promo-code-add.component.html',
  styleUrls: ['./promo-code-add.component.css']
})
export class PromoCodeAddComponent implements OnInit {
  dataLoaded=false;
  constructor(private promoCodeService:PromoCodeService, private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  promoCodeAddForm = new FormGroup({
    code: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    discountRate: new FormControl("",[Validators.required,Validators.min(0),Validators.max(1.01)]),
    startDate: new FormControl("",[Validators.required,]),
    endDate: new FormControl("",[Validators.required,]),
    description: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(255)])
  })

  clearPromoCodeAddForm() {
    this.promoCodeAddForm.patchValue({
      code: '',   
      discountRate: '',  
      startDate: '',  
      endDate: '',  
      description: '',  
    });
  }

  add(){
    this.dataLoaded = true;
    let codeModel = Object.assign({},this.promoCodeAddForm.value);
    this.promoCodeService.add(codeModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.clearPromoCodeAddForm();
          this.promoCodeAddForm.markAsUntouched();
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