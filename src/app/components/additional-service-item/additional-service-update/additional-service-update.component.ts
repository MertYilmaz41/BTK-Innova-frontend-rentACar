import { UpdateAdditionalServiceItemRequest } from './../../../models/additionalServiceItemModels/updateAdditionalServiceItemRequest';
import { ToastrService } from 'ngx-toastr';
import { AdditionalServiceService } from './../../../services/iAdditionalService/additional-service.service';
import { Component, OnInit } from '@angular/core';
import { AdditionalServiceItemListModel } from 'src/app/models/additionalServiceItemModels/additionalServiceItemListModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-service-update',
  templateUrl: './additional-service-update.component.html',
  styleUrls: ['./additional-service-update.component.css']
})
export class AdditionalServiceUpdateComponent implements OnInit {

  dataLoaded:boolean = false;
  updateAdditionalServiceItem:AdditionalServiceItemListModel;

  constructor(
    private additionalService:AdditionalServiceService,
    private toastrService:ToastrService,
    private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    //this.getById(parseInt(this.activatedroute.snapshot.paramMap.get('id')));
  }


  updateAdditionalServiceItemForm = new FormGroup({
    name: new FormControl("",[Validators.required]),
    price: new FormControl("",[Validators.required]),
  })


  clearAdditionalServiceItemUpdateForm() {
    this.updateAdditionalServiceItemForm.patchValue({
      name: '',   
      price: ''   
    });
  }

  getById(id:number){
    this.additionalService.getById(id).subscribe(
      (response: SingleResponseModel<AdditionalServiceItemListModel>) => {
        if (response.success) {   
          this.updateAdditionalServiceItem=response.data;
          this.updateAdditionalServiceItemForm.patchValue({
            name:response.data.name,   
            price:response.data.price
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
    this.dataLoaded = true;
    let updateAdditionalService:UpdateAdditionalServiceItemRequest = Object.assign({},this.updateAdditionalServiceItemForm.value);
    updateAdditionalService.id=this.updateAdditionalServiceItem.id;
    this.additionalService.update(updateAdditionalService).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.dataLoaded = false;
          this.clearAdditionalServiceItemUpdateForm();
          this.updateAdditionalServiceItemForm.markAsUntouched();
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










}
