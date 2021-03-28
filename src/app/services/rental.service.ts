import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCreditCard } from '../models/fakeCreditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl='https://localhost:44308/api/';
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }


  getRentalByCarId(id:number){
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+'rentals/detailsbycar?id='+id);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",rental)
  }

  
  pay(rental:Rental,amount:number):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/paymentadd";
    return this.httpClient.post<ResponseModel>(newPath,{payment:{amount:amount},rental:rental});
}
}