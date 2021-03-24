import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages:CarImage[]=[]
  carDetails:CarDetail[]=[];
  constructor(private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailById(params["carId"]);
        this.getImagesByCarId(params["carId"]);
      } else {
        this.getImagesByCarId(params["carId"]);
      }
    })    
  }

  getCarDetailById(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response=>{
      this.carDetails = response.data;
    })
  }

  getImagesByCarId(carId:number){
    this.carDetailService.getImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data;
      console.log(this.carImages)
    })
  }

  getCurrentImageClass(image:CarImage){
    if(image == this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }
}
