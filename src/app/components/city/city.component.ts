import { HttpErrorResponse } from '@angular/common/http';
import { CityListModel } from './../../models/cityModels/cityListModel';
import { ToastrService } from 'ngx-toastr';
import { CityService } from './../../services/cityServices/city.service';
import { Component, OnInit } from '@angular/core';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities:CityListModel[]=[]
  dataLoaded:boolean = false;
  deleteLoading:boolean = false;
  searchTerm:string='';

  constructor(private cityService:CityService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(){
    this.dataLoaded = true;   
    this.cityService.getCities().subscribe(
      (response: ListResponseModel<CityListModel>) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.cities=response.data;
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

  delete(id: number){
    this.deleteLoading = true;
    this.cityService.delete(id).subscribe(response =>{
      if(response.success)
      {
        this.deleteLoading = true;
        this.getCities();
        this.toastrService.success(response.message,"Başarılı")
      }
      else
      {
        this.deleteLoading = false;
        this.toastrService.warning(response.message,"Başarısız")
      }
    },(errorResponse:HttpErrorResponse) =>{
      this.deleteLoading = false;
      this.toastrService.error(errorResponse.message,"Başarısız")
    }
    )
  }



}
