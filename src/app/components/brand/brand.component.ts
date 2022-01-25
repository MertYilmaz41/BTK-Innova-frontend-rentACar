import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../services/brandServices/brand.service';
import { Component, OnInit } from '@angular/core';
import { BrandListModel } from 'src/app/models/brandModels/brandListModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:BrandListModel[]=[]
  dataLoaded:boolean = false
  deleteLoaded:boolean = false;
 
  constructor(private brandService:BrandService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.dataLoaded = true
    this.brandService.getBrands().subscribe(response=>{
      if(response.success)
      {
        this.brands = response.data;
        this.toastrService.success(response.message,"Başarılı")
        this.dataLoaded = true;
      }
      else
      {
        this.toastrService.warning(response.message,"Başarısız")
        this.dataLoaded = false;
      }
    },(errorResponse:HttpErrorResponse) =>{
      this.toastrService.error(errorResponse.message,"Başarısız")
      this.dataLoaded = false;
    }

      )
    }



    delete(id:number){
      this.deleteLoaded = true;
      this.brandService.delete(id).subscribe(response =>{
        if(response.success){
          this.deleteLoaded = false;
          this.getBrands();
          this.toastrService.success(response.message,"Başarılı")
        }
        else{
          this.toastrService.warning(response.message,"Başarısız");
          this.deleteLoaded = false;
        }
      },(errorResponse:HttpErrorResponse) =>{
        this.toastrService.error(errorResponse.message,"Başarısız")
        this.deleteLoaded = false;
      }
      )
  
    }


 }
