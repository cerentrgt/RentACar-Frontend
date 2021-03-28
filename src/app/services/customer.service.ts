import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl='https://localhost:44308/api/';
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerById(id:number):Observable<ItemResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getbyid?id=" + id
    return this.httpClient
    .get<ItemResponseModel<Customer>>(newPath)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/update"
    return this.httpClient
    .post<ResponseModel>(newPath,customer)
  }
}
