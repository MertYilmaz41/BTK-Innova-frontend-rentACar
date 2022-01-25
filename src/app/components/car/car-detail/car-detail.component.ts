
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
  constructor( 
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private router:Router,
     ) 
     { }
 
  ngOnInit(): void {
    this.getById();
    
  }

  getById(){
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.carService.getById(params['id']).subscribe(response => {
          this.car = response.data
        })
      }
    })
  }



 
 

}
