import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';


const routes: Routes = [
  { path: 'car-detail/:carId', component: CarDetailComponent },
  { path: 'cars', component: CarComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'colors', component: ColorComponent },
  { path : 'colors/add', component:ColorAddComponent},
  { path: '', component: CarComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
