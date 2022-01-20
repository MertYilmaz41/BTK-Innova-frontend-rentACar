import { ColorService } from '../../services/colorServices/color.service';
import { ColorListModel } from '../../models/colorModels/colorListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  constructor(private colorService:ColorService) { }
  colors:ColorListModel[]=[];
  dataLoaded:boolean = false;
  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.dataLoaded = false;
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }
}
