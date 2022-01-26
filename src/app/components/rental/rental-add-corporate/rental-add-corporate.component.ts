import { SingleResponseModel } from './../../../models/responseModels/singleResponseMode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseModel } from './../../../models/responseModels/response.model';
import { CreatePaymentRequest } from './../../../models/paymentModels/createPaymentRequest';
import { RentalAddResponseModel } from './../../../models/responseModels/rentalAddResponseModel';
import { CreateRentalRequestForCorporateCustomer } from './../../../models/rentalModels/createRentalRequestForCorporateCustomer';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from '../../../services/rentalServices/rental.service';
import { Component, OnInit } from '@angular/core';
import { PromoCodeService } from 'src/app/services/promoCodeServices/promo-code.service';
import { AdditionalServiceService } from 'src/app/services/iAdditionalService/additional-service.service';
import { PaymentService } from 'src/app/services/paymentServices/payment.service';
import { CarService } from 'src/app/services/carServices/car.service';
import { CustomerCardDetailService } from 'src/app/services/customerCardDetailServices/customer-card-detail.service';
import { CarListModel } from 'src/app/models/carModels/carListModel';
import { RentalListModel } from 'src/app/models/rentalModels/rentalListModel';
import { PromoCodeListModel } from 'src/app/models/promoCodeModels/promoCodeListModel';
import { AdditionalServiceItemListModel } from 'src/app/models/additionalServiceItemModels/additionalServiceItemListModel';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-rental-add-corporate',
  templateUrl: './rental-add-corporate.component.html',
  styleUrls: ['./rental-add-corporate.component.css']
})
export class RentalAddCorporateComponent implements OnInit {

  customerId:number;
  carId: number;
  car: CarListModel;
  addLoading = false;
  additionalServiceItems: AdditionalServiceItemListModel[] = [];
  activeRental: RentalListModel;
  returnDate: Date;
  totalPrice: number;
  isCardDetailSaved = false;
  paymentLoading = false;
  status: string = 'rental';
  promoCode: PromoCodeListModel;
  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private promoCodeService: PromoCodeService,
    private activatedRoute: ActivatedRoute,
    private additionalServiceItemService: AdditionalServiceService,
    private paymentService: PaymentService,
    private router: Router,
    private carService: CarService,
    private customerCardDetailService: CustomerCardDetailService,
      ) 
      { }

  ngOnInit(): void {
  }

  rentalAddForm = new FormGroup({
    rentDate: new FormControl('', [ Validators.required,Validators.minLength(2),Validators.maxLength(30), ]),
    returnDate: new FormControl('', [Validators.required])
  });

  promoCodeForm = new FormGroup({
    code: new FormControl('', [Validators.maxLength(30),Validators.required]),
  });

  clearRentalAddForm() { this.rentalAddForm.patchValue({ rentDate: '', returnDate: '', });
  }

  paymentAddForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(250),
    ]),
    cardNo: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern(/^[0-9]\d*$/),
    ]),
    month: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.pattern(/^[0-9]\d*$/),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.pattern(/^[0-9]\d*$/),
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern(/^[0-9]\d*$/),
    ]),
  });

  additionalServiceAddForm = new FormGroup({
    additionalServiceitem: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });


  getPromoCodeByCode(code: string) {
    this.promoCodeService.getByCode(code).subscribe(
      (response) => {
        if (response.success) {
          this.promoCode = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }


  getById(id: number) {
    this.rentalService.getById(id).subscribe(
      (response: SingleResponseModel<RentalListModel>) => {
        if (response.success) {
          this.activeRental = response.data;
          // this.toastrService.success(response.message,"Başarılı");
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }
    

  addRental() {
      this.addLoading = true;
      let createRentalModel: CreateRentalRequestForCorporateCustomer = Object.assign(
        {},
        this.rentalAddForm.value
      );
      createRentalModel.corporateCustomerId = this.customerId;
      if (this.promoCode == null) {
        createRentalModel.promoCodeId = 7;
      } else {
        createRentalModel.promoCodeId = this.promoCode.id;
      }
         createRentalModel.carId = this.carId;
        this.rentalService.addForCorporateCustomer(createRentalModel).subscribe(
        (response: SingleResponseModel<RentalAddResponseModel>) => {
          if (response.success) {
            this.returnDate = this.rentalAddForm.get('returnDate').value;
            this.addLoading = false;
            let model: RentalAddResponseModel = response.data;
          this.getById(response.data.id);
            this.carId = response.data.carId;
              this.clearRentalAddForm();
               this.rentalAddForm.markAsUntouched();
            this.status = 'service';
            this.toastrService.success(response.message, 'Başarılı');
          } else {
            this.toastrService.warning(response.message, 'Başarısız');
            this.addLoading = false;
         }
       },
        (errorResponse: HttpErrorResponse) => {
       this.toastrService.error(errorResponse.message, 'Başarısız');
        this.addLoading = false;
        }
      );
     this.addLoading = false;
   }




  getAdditionalServiceItems() {
    this.additionalServiceItemService.getAll().subscribe(
      (response) => {
        if (response.success) {
          this.additionalServiceItems = response.data;
          //   this.toastrService.success(response.message,"Başarılı");
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }

  getByCarId() {
    this.carService.getById(this.carId).subscribe(
      (response) => {
        if (response.success) {
          this.car = response.data;
          //   this.toastrService.success(response.message,"Başarılı");
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }


  addPayment() {
    this.paymentLoading = true;
    let createPaymentModel: CreatePaymentRequest = Object.assign(
      {},
      this.paymentAddForm.value
    );
    createPaymentModel.rentalId = this.activeRental.id;
    createPaymentModel.returnDate = this.returnDate;
    this.paymentService.add(createPaymentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.paymentLoading = false;
          this.status = 'success';
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.paymentLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.paymentLoading = false;
      }
    );
    this.paymentLoading = false;
  }


}
