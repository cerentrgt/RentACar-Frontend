import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerCard } from '../models/customerCard';
import { FakeCreditCard } from '../models/fakeCreditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerCardService {

  apiUrl = 'https://localhost:44308/api/customercards';
  constructor(private httpClient:HttpClient) { }


  add(fakeCreditCard:FakeCreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",fakeCreditCard)
  }
  update(fakeCreditCard:FakeCreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",fakeCreditCard)
  }

  deleteColor(fakeCreditCard:FakeCreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/delete",fakeCreditCard)
  }
}
