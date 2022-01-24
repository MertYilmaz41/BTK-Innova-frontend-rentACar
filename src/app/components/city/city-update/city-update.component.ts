import { ActivatedRoute } from '@angular/router';
import { CityListModel } from '../../../models/cityModels/cityListModel';
import { UpdateCityRequest } from '../../../models/cityModels/updateCityRequests';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CityService } from '../../../services/cityServices/city.service';
import { Component, OnInit } from '@angular/core';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.css']
})
export class CityUpdateComponent implements OnInit {
  loading:boolean = false;
  updateCity:CityListModel;
  cityUpdateForm:FormGroup;

  constructor(
    private cityService:CityService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) 
    { }

  ngOnInit(): void {
   
  }

  createCityUpdateForm(){
    this.cityUpdateForm = this.formBuilder.group({
      cityName:["",Validators.required]
    })
  }

  findById(id:number){
    this.cityService.getCitiesById(id).subscribe(
      (response: SingleResponseModel<CityListModel>) => {
        if (response.success) {   
          this.updateCity=response.data;
          this.cityUpdateForm.patchValue({
            cityName:response.data.cityName,   
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
    let cityModel:UpdateCityRequest = Object.assign({},this.cityUpdateForm.value);
    cityModel.id = this.updateCity.id;
    this.cityService.update(cityModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {               
          this.loading = false;
          this.cityUpdateForm.markAsUntouched();
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
