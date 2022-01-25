import { UpdateBrandRequest } from './../../../models/brandModels/updateBrandRequest';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../../services/brandServices/brand.service';
import { BrandListModel } from 'src/app/models/brandModels/brandListModel';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  loading:boolean = false;
  updateBrand:BrandListModel;
  brandUpdateForm:FormGroup;
  constructor(
      private brandService:BrandService,
      private toastrService:ToastrService,
      private formBuilder:FormBuilder,
      private activatedRoute:ActivatedRoute
      ) 
      { }

  ngOnInit(): void {
    
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  getById(id:number){
    this.brandService.getById(id).subscribe(
      (response: SingleResponseModel<BrandListModel>) => {
        if (response.success) {   
          this.updateBrand=response.data;
          this.brandUpdateForm.patchValue({
          brandName:response.data.name,   
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
    this.loading = true;
    let cityModel:UpdateBrandRequest = Object.assign({},this.brandUpdateForm.value);
    cityModel.id = this.updateBrand.id;
    this.brandService.update(cityModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {               
          this.loading = false;
          this.brandUpdateForm.markAsUntouched();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.loading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.loading = false;
      }
    )
  }

}
