import { BrandService } from './../../services/brandServices/brand.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  loading:boolean=false;
  brandAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder , private brandService:BrandService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }


  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }


  add(){
    this.loading = true;
    let brandModel = Object.assign({},this.brandAddForm.value);
    this.brandService.add(brandModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          console.log(response)                
          this.loading = false;
       
          this.brandAddForm.markAsUntouched();
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
