import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PromoCodeListModel } from './../../../../models/promoCodeModels/promoCodeListModel';
import { Component, OnInit } from '@angular/core';
import { PromoCodeService } from 'src/app/services/promoCodeServices/promo-code.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { UpdatePromoCodeRequest } from 'src/app/models/promoCodeModels/updatePromoCodeRequest';

@Component({
  selector: 'app-promo-code-update',
  templateUrl: './promo-code-update.component.html',
  styleUrls: ['./promo-code-update.component.css']
})
export class PromoCodeUpdateComponent implements OnInit {
  dataLoaded:boolean = false;
  editPromoCode:PromoCodeListModel;

  constructor(private promoCodeService : PromoCodeService,
              private toastrService : ToastrService,
              private activatedRoute : ActivatedRoute) 
              { }

  ngOnInit(): void {
  }

  
  promoCodeUpdateForm = new FormGroup({
    code: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    discountRate: new FormControl("",[Validators.required,Validators.min(0),Validators.max(1.01)]),
    startDate: new FormControl("",[Validators.required,]),
    endDate: new FormControl("",[Validators.required,]),
    description: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(255)])
  })

  clearPromoCodeUpdateForm() {
    this.promoCodeUpdateForm.patchValue({
      code: '',   
      discountRate: '',   
      startDate: '',   
      endDate: '',   
      description: '',   
    });
  }

  getById(id:number){
    this.promoCodeService.getById(id).subscribe(
      (response: SingleResponseModel<PromoCodeListModel>) => {
        if (response.success) {   
          this.editPromoCode=response.data;
          this.promoCodeUpdateForm.patchValue({
            code:response.data.code,   
            discountRate:response.data.discountRate, 
            startDate:response.data.startDate, 
            endDate:response.data.endDate, 
            description:response.data.code, 
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
    let codeModel:UpdatePromoCodeRequest = Object.assign({},this.promoCodeUpdateForm.value);
    codeModel.id=this.editPromoCode.id;
    this.promoCodeService.update(codeModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.clearPromoCodeUpdateForm();
          this.promoCodeUpdateForm.markAsUntouched();
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
