import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  apiUrl='https://localhost:44308/api/';
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getallcars"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarById(carId:number):Observable<ItemResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbyid?carId=" + carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath);
  }


  getCarDetailByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetailbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetailbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetail():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetail";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getByDailyPrice():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getbydailyprice";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailById(id:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetailbyid?id=" + id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarByBrandAndColor(brandId:Number,colorId:Number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getbybrandandcolor?brandid=${brandId}&colorid=${colorId}";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsDetails(brandId?:number,colorId?:number,id?:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarsdetails?"
    if(brandId){
      newPath += "brandid=" + brandId + "&"
    }
    if(colorId){
      newPath += "colorid=" + colorId + "&"
    }
    if(id){
      newPath += "id=" + id + "&"
    }
    return this.httpClient
      .get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }
  deleteCars(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car)
  }
 
}
