import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';

import { CustomerService } from 'src/app/services/customer.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { RentalService } from 'src/app/services/rental.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  carDetail:CarDetail;
  startDate:string;
  endDate:string;
  rentPrice:number = 0;
  rental:Rental;
  rentable:Boolean= false;
  minDate:string|null;
  endMinDate:string|null;
  maxDate:string|null;
  rentals:Rental[]=[];
  constructor(private rentalService:RentalService,
    private toastrService:ToastrService,
    private findeksService:FindeksService,
    private customerService:CustomerService,
    private carService:CarService) { }

  ngOnInit(): void {
    this.getRentals();


  }
  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data
    })
  }




  calculatePrice():number{
    if(this.startDate && this.endDate){
      let endDate = new Date(this.endDate.toString())
      let startDate = new Date(this.startDate.toString())
      let endDay = Number.parseInt(endDate.getDate().toString())
      let endMonth = Number.parseInt(endDate.getMonth().toString())
      let endYear = Number.parseInt(endDate.getFullYear().toString())
      let startDay = Number.parseInt(startDate.getDate().toString())
      let startMonth = Number.parseInt(startDate.getMonth().toString())
      let startYear = Number.parseInt(startDate.getFullYear().toString())
      let result =  ((endDay - startDay) + ((endMonth - startMonth)*30) + ((endYear - startYear)*365) + 1) * this.carDetail.dailyPrice
      if (result>0){
        return result
      }
    }
    this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız","!")
    return 0
  }




  


}
