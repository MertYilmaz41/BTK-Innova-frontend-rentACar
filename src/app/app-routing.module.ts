import { RentalAddCorporateComponent } from './components/rental/rental-add-corporate/rental-add-corporate.component';
import { AdditionalServiceItemComponent } from './components/additional-service-item/additional-service-item.component';

import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CityUpdateComponent } from './components/city/city-update/city-update.component';
import { CityAddComponent } from './components/city/city-add/city-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CustomerCardDetailComponent } from './components/customer-card-detail/customer-card-detail.component';
import { CityComponent } from './components/city/city.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { AdditionalServiceAddComponent } from './components/additional-service-item/additional-service-add/additional-service-add.component';
import { AdditionalServiceUpdateComponent } from './components/additional-service-item/additional-service-update/additional-service-update.component';




const routes: Routes = [
  {path: 'car-detail/:id', component: CarDetailComponent},

  {path: 'additionalserviceitems', component:AdditionalServiceItemComponent},
  {path: 'additionalserviceitem/add', component:AdditionalServiceAddComponent},
  {path: 'additionalserviceitem/update', component:AdditionalServiceUpdateComponent},

  { path: 'cars', component: CarComponent },
  { path: 'car/add', component:CarAddComponent},
  { path: 'cars/update', component:CarUpdateComponent},

  { path: 'cities', component:CityComponent},
  { path: 'city/add', component:CityAddComponent},
  { path: 'city/update', component:CityUpdateComponent},


  { path: 'rentals', component: RentalComponent },
  { path: 'rentals/add', component: RentalAddCorporateComponent },


  { path: 'brands', component: BrandComponent },
  { path: 'brand/add', component: BrandAddComponent },
  { path: 'brand/update/:id', component: BrandUpdateComponent },

  { path: 'customercarddetails', component: CustomerCardDetailComponent},

  { path: 'colors', component: ColorComponent },
  { path: 'color/add', component:ColorAddComponent},
  { path: 'color/update', component:ColorUpdateComponent},
  { path: '', component: CarComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
