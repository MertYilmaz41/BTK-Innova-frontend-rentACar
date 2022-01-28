import { CarService } from '../../services/carServices/car.service';
import { CarListModel } from '../../models/carModels/carListModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:CarListModel[]=[]
  dataLoaded:boolean = false
  
  constructor(private carService:CarService, private router:Router ) { }

  ngOnInit(): void {
    this.getCars();
    
  }


  getCars(){
    this.dataLoaded=true;
    this.carService.getCars().subscribe(response=>{
  
      this.cars = response.data;
      this.dataLoaded = false;
    })
  }


   routeToCarDetail(carId:number):void{
     let url="/car-detail/"+carId
     this.router.navigateByUrl(url);
   }

}
