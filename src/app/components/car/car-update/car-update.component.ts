import { UpdateCarRequest } from './../../../models/carModels/updateCarRequest';
import { ColorService } from './../../../services/colorServices/color.service';
import { SegmentService } from './../../../services/segmentServices/segment.service';
import { CityService } from './../../../services/cityServices/city.service';
import { BrandService } from './../../../services/brandServices/brand.service';
import { ActivatedRoute } from '@angular/router';
import { CarListModel } from 'src/app/models/carModels/carListModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/carServices/car.service';
import { BrandListModel } from 'src/app/models/brandModels/brandListModel';
import { ColorListModel } from 'src/app/models/colorModels/colorListModel';
import { SegmentListModel } from 'src/app/models/segmentModels/segmentListModel';
import { CityListModel } from 'src/app/models/cityModels/cityListModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  dataLoaded:boolean=false;
  carUpdate:CarListModel
  carUpdateForm:FormGroup
  colorsLoaded = false;
  brandsLoaded = false;
  segmentsLoaded = false;
  citiesLoaded = false;
  carUpdateLoaded = false;
  brands: BrandListModel[] = []
  colors: ColorListModel[] = []
  segments: SegmentListModel[] = []
  cities: CityListModel[] = []


  constructor(
    private carService:CarService, 
    private brandService:BrandService,
    private cityService:CityService,
    private segmentService:SegmentService,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute

     ) 
     { }

  ngOnInit(): void {
    //this.findById(parseInt(this.activatedRoute.snapshot.paramMap.get('id')));
    this.getBrands();
    this.getColors();
    this.getCities();
    this.getSegments();
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelYear:["",Validators.required],
      findexScore:["",Validators.required],
      kilometer:["",Validators.required],
      imageUrl:["",Validators.required],
      description:["",Validators.required],
      minAge:["",Validators.required],
      segmentId:["",Validators.required],
      cityId:["",Validators.required]
    })
  }

  clearCarUpdateForm() {
    this.carUpdateForm.patchValue({
      carName: '',
      brandId: '',
      colorId: '',
      dailyPrice: '',
      findexScore: '',
      kilometer: '',
      imageUrl: '',
      description: '',
      minAge: '',
      segmentId: '',
      cityId: '',
    });
  }

  getBrands() {
    this.brandsLoaded = true;
    this.brandService.getBrands().subscribe(response => {
      if (response.success) {
        this.brands = response.data;
        //this.toastrService.success(response.message,"Başarılı");
        this.brandsLoaded = false;
      } else {
        this.toastrService.warning(response.message, "Başarısız");
        this.brandsLoaded = false;
      }
    }, (errorResponse: HttpErrorResponse) => {
      this.toastrService.error(errorResponse.message, "Başarısız");
      this.brandsLoaded = false;
    }
    )
  }

  getColors() {
    this.colorsLoaded = true;
    this.colorService.getColors().subscribe(response => {
      if (response.success) {
        this.colors = response.data;
        //this.toastrService.success(response.message,"Başarılı");
        this.colorsLoaded = false;
      } else {
        this.toastrService.warning(response.message, "Başarısız");
        this.colorsLoaded = false;
      }
    }, (errorResponse: HttpErrorResponse) => {
      this.toastrService.error(errorResponse.message, "Başarısız");
      this.colorsLoaded = false;
    }
    )
  }

  getSegments() {
    this.segmentsLoaded = true;
    this.segmentService.getSegments().subscribe(response => {
      console.log(response)
      if (response.success) {
        this.segments = response.data;
        //this.toastrService.success(response.message,"Başarılı");
        this.segmentsLoaded = false;
      } else {
        this.toastrService.warning(response.message, "Başarısız");
        this.segmentsLoaded = false;
      }
    }, (errorResponse: HttpErrorResponse) => {
      this.toastrService.error(errorResponse.message, "Başarısız");
      this.segmentsLoaded = false;
    }
    )
  }

  getCities() {
    this.citiesLoaded = true;
    this.cityService.getCities().subscribe(response => {
      if (response.success) {
        this.cities = response.data;
        //this.toastrService.success(response.message,"Başarılı");
        this.citiesLoaded = false;
      } else {
        this.toastrService.warning(response.message, "Başarısız");
        this.citiesLoaded = false;
      }
    }, (errorResponse: HttpErrorResponse) => {
      this.toastrService.error(errorResponse.message, "Başarısız");
      this.citiesLoaded = false;
    }
    )
  }

  findById(id: number) {
    this.carService.getById(id).subscribe(
      (response: SingleResponseModel<CarListModel>) => {
        if (response.success) {
          this.carUpdate = response.data;
          this.carUpdateForm.patchValue({
            model: response.data.model,
            carName: response.data.carName,
            brandId: response.data.brandId,
            colorId: response.data.colorId,
            dailyPrice: response.data.dailyPrice,
            findexScore: response.data.findexScore,
            kilometer: response.data.kilometer,
            imageUrl: response.data.imageUrl,
            description: response.data.description,
            minAge: response.data.minAge,
            segmentId: response.data.segmentId,
            cityId: response.data.cityId,
          });
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");

      }
    )
  }

  update() {
    this.dataLoaded = true;
    let carModel: UpdateCarRequest = Object.assign({}, this.carUpdateForm.value);
    carModel.id = this.carUpdate.id
    this.carService.update(carModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.dataLoaded = false;
          this.clearCarUpdateForm();
          this.carUpdateForm.markAsUntouched();
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
          this.dataLoaded = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");
        this.dataLoaded = false;
      }
    )

  }


}
