import { Injectable } from '@angular/core';
import { CarService } from './car.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  constructor(
    private customerService:CustomerService,
    private carService:CarService) { }

  async isCustomerFindexEnough(customerId:number,id:number){
    let customer = (await this.customerService.getCustomerById(customerId).toPromise()).data
    let car = (await this.carService.getCarById(id).toPromise()).data
    if(customer.findeksScore >= car.minFindeksScore){
      return true
    }
    return false
  }
}
