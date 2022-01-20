import { CarService } from '../../services/carServices/car.service';
import { CarListModel } from '../../models/carModels/carListModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:CarListModel[]=[]
  dataLoaded:boolean = false
  
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getCars();
    
  }


  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.dataLoaded = false;
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }


  // routeToCarDetail(carId:number):void{
  //   let url="/car-detail/"+carId
  //   this.activatedRoute.navigateByUrl(url);
  // }

}
