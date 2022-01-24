import { RentalAddIndividualComponent } from './components/rental/rental-add-individual/rental-add-individual.component';
import { RentalAddCorporateComponent } from './components/rental/rental-add-corporate/rental-add-corporate.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CityComponent } from './components/city/city.component';
import { CityUpdateComponent } from './components/city/city-update/city-update.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AdditionalServiceItemComponent } from './components/additional-service-item/additional-service-item.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CustomerCardDetailComponent } from './components/customer-card-detail/customer-card-detail.component';
import { PromoCodeComponent } from './components/promo-code/promo-code.component';
import { PromoCodeUpdateComponent } from './components/promo-code/promo-code-update/promo-code-update/promo-code-update.component';
import { PromoCodeAddComponent } from './components/promo-code/promo-code-add/promo-code-add.component';
import { PaymentAddComponent } from './components/payment/payment-add/payment-add.component';
import { PaymentUpdateComponent } from './components/payment/payment-update/payment-update.component';
import { AdditionalServiceAddComponent } from './components/additional-service-item/additional-service-add/additional-service-add.component';
import { AdditionalServiceUpdateComponent } from './components/additional-service-item/additional-service-update/additional-service-update.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    CarDetailComponent,
    RentalComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CityComponent,
    CityUpdateComponent,
    RentalAddCorporateComponent,
    RentalAddIndividualComponent,
    AdditionalServiceItemComponent,
    PaymentComponent,
    CustomerCardDetailComponent,
    PromoCodeComponent,
    PromoCodeUpdateComponent,
    PromoCodeAddComponent,
    PaymentAddComponent,
    PaymentUpdateComponent,
    AdditionalServiceAddComponent,
    AdditionalServiceUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
