
import { ActivatedRoute, Router } from '@angular/router';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseMode';
import { CarService } from 'src/app/services/carServices/car.service';
import { OnInit, Component } from '@angular/core';
import { CarListModel } from 'src/app/models/carModels/carListModel';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carId:number
  car:CarListModel
  dataLoaded = false;
  constructor( private activatedRoute:ActivatedRoute, private carService:CarService,) { }
 
  ngOnInit(): void {
    //this.carId = parseInt(this.activatedRoute.snapshot.paramMap.get('carId')); 
    this.getById(this.carId);
  }


  getById(carId:number):void{ 
    this.carService.getById(carId).subscribe(
      (response:SingleResponseModel<CarListModel>)=>{
        this.dataLoaded = false;
        this.car = response.data;
        this.dataLoaded = true;
      }
    )
  }




}
