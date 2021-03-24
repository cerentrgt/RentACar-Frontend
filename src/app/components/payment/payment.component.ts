import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor( private activatedRoute:ActivatedRoute,
    private router:Router,private toastr: ToastrService, private paymentService:PaymentService,
   
    ) { }
  rental:Rental;
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
    console.log(this.car)
    console.log(this.rental);
  }

  pay(){
    this.paymentService.pay(this.rental,this.amountOfPayment).subscribe(response => {
      this.router.navigate(['/carDetails']);
      this.toastr.success(response.message.toString(), "İşlem Başarılı");
    })
  }

}
