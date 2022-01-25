import { RentalService } from './../../services/rentalServices/rental.service';
import { Component, OnInit } from '@angular/core';
import { RentalListModel } from 'src/app/models/rentalModels/rentalListModel';
import { ToastrService } from 'ngx-toastr';
import { ListResponseModel } from 'src/app/models/responseModels/listReponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/response.model';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals: RentalListModel[] = [];
  dataLoaded: boolean = false;
  deleteLoaded = false;
  constructor( 
    private rentalService: RentalService,
    private toastrService: ToastrService

    ) 
    { }

  ngOnInit(): void {
    
    this.getAll();
  }

  getAll() {
    this.dataLoaded = true;
    this.rentalService.getAll().subscribe(
      (response: ListResponseModel<RentalListModel>) => {
        if (response.success) {
          this.dataLoaded = false;
          this.rentals = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.dataLoaded = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.dataLoaded = false;
      }
    );
  }

  delete(id: number) {
    this.deleteLoaded = true;
    this.rentalService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.deleteLoaded = false;
          this.getAll();
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.deleteLoaded = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.deleteLoaded = false;
      }
    );
  }

}
