import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from '../../../services/rentalServices/rental.service';
import { Component, OnInit } from '@angular/core';
import { RentalListModel } from 'src/app/models/rentalModels/rentalListModel';
import { CityListModel } from 'src/app/models/cityModels/cityListModel';
import { CityService } from 'src/app/services/cityServices/city.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-rental-add-corporate',
  templateUrl: './rental-add-corporate.component.html',
  styleUrls: ['./rental-add-corporate.component.css']
})
export class RentalAddCorporateComponent implements OnInit {

  dataLoaded:boolean=false;
  rentalAddForm:FormGroup
  cities: CityListModel[]
  rental: RentalListModel;
  carId: number
  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute, 
    private formBuilder:FormBuilder, 
    private cityService: CityService, 
    private router: Router,
    private toastrService:ToastrService,
      ) 
      { }

  ngOnInit(): void {
    //this.getRouteCarId();
    //this.getCities()
  }

  createRentalAddForm = new FormGroup({
    rentDate: new FormControl("",[Validators.required]),
    corporateCustomerId: new FormControl("",[Validators.required]),
    carId: new FormControl("",[Validators.required]),
  })

  getRouteCarId(){
    this.activatedRoute.params.subscribe(params => { 
      this.carId = params["id"]
    })
  }



  add(){
    this.dataLoaded = true;
    let rentalModel = Object.assign({},this.createRentalAddForm.value);
    this.rentalService.addForCorporateCustomer(rentalModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.dataLoaded = false;
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







  getCities(){
    this.cityService.getCities().subscribe(response => {
      this.cities = response.data
    })
  }




    




}
