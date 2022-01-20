import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/colorServices/color.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseModel } from 'src/app/models/responseModels/response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  loading:boolean=false;
  colorAddForm:FormGroup
  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }


  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  add(){
    this.loading =true;
    let colorModel = Object.assign({},this.colorAddForm.value);
    this.colorService.add(colorModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          console.log(response)                
          this.loading = false;
       
          this.colorAddForm.markAsUntouched();
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
