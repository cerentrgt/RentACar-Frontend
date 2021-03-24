import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  brands:Brand[]=[];
  carDetails:CarDetail[]=[];
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]&&params["colorId"]){
        this.getCarByFilter(params["brandId"],params["colorId"])
      }
      else if(params["brandId"]){
        this.getCarDetailByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarDetailByColor(params["colorId"])
      }else{
        this.getCarDetail();
      }
    })
    
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
    })
  }
  getCarDetailByColor(colorId:number){
    this.carService.getCarDetailByColor(colorId).subscribe(response=>{
      this.carDetails=response.data
    })
  }
  getCarDetailByBrand(brandId:number){
    this.carService.getCarDetailByBrand(brandId).subscribe(response=>{
      this.carDetails=response.data
    })
  }
  getCarByFilter(brandId:Number, colorId: Number) {
    this.carService.getCarByBrandAndColor(brandId,colorId).subscribe(response => {
      this.cars = response.data;
      if(this.cars.length == 0){
        this.toastrService.info('Arama sonuçunuza ait bir araç bulunmamaktadır.', 'Arama Sonucu');
      }
    })
    
  }

  getCarDetail() {
    this.carService.getCarDetail().subscribe((response) => {
      this.carDetails = response.data;
    
    });
  }

 
  
}
