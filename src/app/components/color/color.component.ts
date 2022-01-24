import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../services/colorServices/color.service';
import { ColorListModel } from '../../models/colorModels/colorListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  constructor(private colorService:ColorService, private toastrService:ToastrService) { }
  colors:ColorListModel[]=[];
  dataLoaded:boolean = false;
  deleteLoading:boolean = false;
  searchTerm:string='';
  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.dataLoaded = true
    this.colorService.getColors().subscribe(response=>{
      if(response.success)
      {
        this.colors = response.data;
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
    this.deleteLoading = true;
    this.colorService.delete(id).subscribe(response =>{
      if(response.success){
        this.deleteLoading = false;
        this.getColors();
        this.toastrService.success(response.message,"Başarılı")
      }
      else{
        this.toastrService.warning(response.message,"Başarısız");
        this.deleteLoading = false;
      }
    },(errorResponse:HttpErrorResponse) =>{
      this.toastrService.error(errorResponse.message,"Başarısız")
      this.deleteLoading = false;
    }
    )

  }

}
