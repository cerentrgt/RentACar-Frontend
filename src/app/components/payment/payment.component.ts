import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor( private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastr: ToastrService,
    private rentalService:RentalService,
  ) { }

 
  rental:Rental;
  rentals:Rental[]=[]
  car:Car;
  carDetails:CarDetail[]=[];
  amountOfPayment:number = 0;
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"&& "car"]){
        this.rental = JSON.parse(params['rental']);
        this.car=JSON.parse(params['car'])
        this.getRental();
        
      }
    })
    
  }


  getRental(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data
    })
  }


  pay(){
    this.rentalService.pay(this.rental,this.amountOfPayment).subscribe(response => {
      this.router.navigate(['/carDetails']);
      this.toastr.success(response.message.toString(), "İşlem Başarılı");
    })
  }
 

}
