import { ColorService } from '../../../services/colorServices/color.service';
import { BrandService } from '../../../services/brandServices/brand.service';
import { SegmentService } from '../../../services/segmentServices/segment.service';
import { CityService } from '../../../services/cityServices/city.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/carServices/car.service';
import { BrandListModel } from 'src/app/models/brandModels/brandListModel';
import { ColorListModel } from 'src/app/models/colorModels/colorListModel';
import { SegmentListModel } from 'src/app/models/segmentModels/segmentListModel';
import { CityListModel } from 'src/app/models/cityModels/cityListModel';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  colorsLoading = false;
  brandsLoading = false;
  segmentsLoading = false;
  citiesLoading = false;
  carAddLoading = false;
  brands :BrandListModel[]=[]
  colors :ColorListModel[]=[]
  segments :SegmentListModel[]=[]
  cities :CityListModel[]=[]

  loading:boolean=false;
 
  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private carService:CarService, 
    private colorService:ColorService,
    private toastrService:ToastrService ,
    private cityService:CityService,
    private segmentService:SegmentService
    ) 
    { }
    carName:string
    brandName:string
    brandId:number
    colorId:number
    dailyPrice:number
    model:number
    findexScore:number
    kilometer:number
    imageUrl:string
    description:string
    minAge:number
    segmentId:number
    cityId:number

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.getCities();
    this.getSegments();

  }


  carAddForm = new FormGroup({
    carName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    brandName: new FormControl("",[Validators.required]),
    model: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(60)]),
    brandId: new FormControl("",[Validators.required,Validators.min(1)]),
    colorId: new FormControl("",[Validators.required]),
    dailyPrice: new FormControl("",[Validators.required]),
    findexScore: new FormControl("",[Validators.required,Validators.min(650),Validators.max(1900)]),
    kilometer: new FormControl("",[Validators.required,Validators.min(0)]),
    imageUrl: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required,Validators.minLength(0),Validators.maxLength(250)]),
    minAge: new FormControl("",[Validators.required,Validators.min(18),Validators.min(50)]),
    segmentId: new FormControl("",[Validators.required,Validators.min(1)]),
    cityId: new FormControl("",[Validators.required,Validators.min(1)]),
  })



  getBrands(){
    this.brandsLoading = true;
    this.brandService.getBrands().subscribe(response =>{
      if(response.success){
        this.brands = response.data;
        this.toastrService.success(response.message,"Başarılı");
        this.brandsLoading = false;
      }else{
        this.toastrService.warning(response.message,"Başarısız");
        this.brandsLoading = false;
      }
    }, (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Başarısız");
      this.brandsLoading = false;
    }
    )
  }

  getCities(){
    this.citiesLoading = true;
    this.cityService.getCities().subscribe(response=>{
      if(response.success){
        this.cities = response.data
        this.toastrService.success(response.message,"Başarılı")
        this.citiesLoading = true;
      }
      else{
        this.toastrService.warning(response.message,"Başarısız")
        this.citiesLoading=false;
      }
    },(errorResponse:HttpErrorResponse) =>{
      this.toastrService.error(errorResponse.message,"Başarısız")
      this.citiesLoading = false;
    }   
     )
   }

  getColors(){
    this.colorsLoading = true;
    this.colorService.getColors().subscribe(response=>{
      if(response.success){
        this.colors = response.data;
        this.toastrService.success(response.message,"Başarılı")
        this.colorsLoading = true;
      }
      else{
        this.toastrService.warning(response.message,"Başarısız")
        this.colorsLoading = false;
      }
    },(errorResponse:HttpErrorResponse)=>{
      this.toastrService.error(errorResponse.message,"Başarısız")
      this.colorsLoading = false;
      }
    )
  }

  getSegments(){
    this.segmentsLoading = true;
    this.segmentService.getSegments().subscribe(response=>{
      if(response.success){
        this.segments = response.data;
        this.toastrService.success(response.message,"Başarılı")
        this.segmentsLoading = true;
      }
      else{
        this.toastrService.warning(response.message,"Başarısız")
        this.segmentsLoading = false;
      }
    },(errorResponse:HttpErrorResponse)=>{
      this.toastrService.error(errorResponse.error,"Başarısız")
      this.segmentsLoading = false;
     }
    )
  }

  add(){
    this.carAddLoading = true;
    let carModel = Object.assign({},this.carAddForm.value);
    this.carService.add(carModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.carAddLoading = false;
          this.carAddForm.markAsUntouched();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.carAddLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.carAddLoading = false;
      }
    )
   
  }











}
