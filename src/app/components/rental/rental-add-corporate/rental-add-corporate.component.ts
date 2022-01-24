import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from '../../../services/rentalServices/rental.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental-add-corporate',
  templateUrl: './rental-add-corporate.component.html',
  styleUrls: ['./rental-add-corporate.component.css']
})
export class RentalAddCorporateComponent implements OnInit {

  constructor(
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
      
      ) 
      { }

  ngOnInit(): void {
  }

}
