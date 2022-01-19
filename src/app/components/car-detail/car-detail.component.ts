import { CarListModel } from './../../models/carListModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carId:number
  car:CarListModel
  dataLoaded = false;
  constructor( private activatedRoute:ActivatedRoute,private carService:CarService,) { }
 
  ngOnInit(): void {
  
     
    this.getById(this.carId);
  }


  getById(carId:number):void
  {
    this.carService.getCarsById(carId).subscribe(response=>{
      this.dataLoaded = false;
      this.car = response.data;
      this.dataLoaded = true;
    })
  }
}
