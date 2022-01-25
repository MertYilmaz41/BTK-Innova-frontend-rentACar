import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CityService } from './../../../services/cityServices/city.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit {
  dataLoaded:boolean=false;
  cityAddForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder, 
    private cityService:CityService, 
    private toastrService:ToastrService
    ) 
    { }

  ngOnInit(): void {
    this.createCityAddForm();
  }

  createCityAddForm(){
    this.cityAddForm = this.formBuilder.group({
      cityName:["",Validators.required]
    })
  }

  add(){
    this.dataLoaded = false;
    let cityModel = Object.assign({},this.cityAddForm.value);
    this.cityService.add(cityModel).subscribe(response =>{
      if(response.success){
        this.dataLoaded = true;
        this.cityAddForm.markAsUntouched();
        this.toastrService.success(response.message,"Başarılı")
      }
      else{
        this.toastrService.warning(response.message,"Başarısız")
        this.dataLoaded = false;
      }
    }, (errorResponse:HttpErrorResponse) => {
      this.toastrService.error(errorResponse.message,"Başarısız")
      this.dataLoaded = false;
    }
    
    )
  }
}
