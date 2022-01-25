import { UpdateColorRequest } from './../../../models/colorModels/updateColorRequest';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../../services/colorServices/color.service';
import { ColorListModel } from 'src/app/models/colorModels/colorListModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  loading:boolean = false;
  updateColor:ColorListModel;
  colorUpdateForm:FormGroup;
  constructor(
    private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }


  createCityUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  getById(id:number){
    this.colorService.getById(id).subscribe(
      (response: SingleResponseModel<ColorListModel>) => {
        if (response.success) {   
          this.updateColor=response.data;
          this.colorUpdateForm.patchValue({
            colorName:response.data.name,   
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
    let updateColor:UpdateColorRequest = Object.assign({},this.colorUpdateForm.value);
    updateColor.id = this.updateColor.id;
    this.colorService.update(updateColor).subscribe(
      (response: ResponseModel) => {
        if (response.success) {               
          this.loading = false;
          this.colorUpdateForm.markAsUntouched();
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
