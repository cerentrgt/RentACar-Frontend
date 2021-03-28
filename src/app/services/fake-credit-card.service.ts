import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCreditCard } from '../models/fakeCreditCard';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakeCreditCardService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'https://localhost:44308/api/';

  isCardExist(fakeCreditCard:FakeCreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fakecreditcards/iscardexist"
    return this.httpClient.post<ResponseModel>(newPath,fakeCreditCard);
  }

  getCardByNumber(cardNumber:string):Observable<ListResponseModel<FakeCreditCard>>{
    let newPath = this.apiUrl + "fakecreditcards/getbycardnumber?cardnumber=" + cardNumber
    return this.httpClient.get<ListResponseModel<FakeCreditCard>>(newPath);
  }

  getCardById(id:number):Observable<ItemResponseModel<FakeCreditCard>>{
    let newPath = this.apiUrl + "fakecreditcards/getbyid?id=" + id
    return this.httpClient.get<ItemResponseModel<FakeCreditCard>>(newPath);
  }

  updateCard(fakeCreditCard:FakeCreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "fakecreditcards/update"
    return this.httpClient.put<ResponseModel>(newPath,fakeCreditCard)
  }
}
