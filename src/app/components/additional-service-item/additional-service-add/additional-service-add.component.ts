import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AdditionalServiceService } from 'src/app/services/iAdditionalService/additional-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Component({
  selector: 'app-additional-service-add',
  templateUrl: './additional-service-add.component.html',
  styleUrls: ['./additional-service-add.component.css']
})
export class AdditionalServiceAddComponent implements OnInit {
  dataLoaded:boolean =false;
  constructor(   
    private additionalService:AdditionalServiceService,
    private toastrService:ToastrService ) { }

  ngOnInit(): void {
 
  }

  additionalServiceItemAddForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    price: new FormControl("", [Validators.required])
  })

  clearItemAddForm() {
    this.additionalServiceItemAddForm.patchValue({
      name: '',
      price: ''
    });
  }

  add() {
    this.dataLoaded = true;
    let additionalServiceItem = Object.assign({}, this.additionalServiceItemAddForm.value);
    this.additionalService.add(additionalServiceItem).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.dataLoaded = false;
          this.clearItemAddForm();
          this.additionalServiceItemAddForm.markAsUntouched();
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
