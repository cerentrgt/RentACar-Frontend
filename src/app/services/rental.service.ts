import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCreditCard } from '../models/fakeCreditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
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

  addRental(rental: RentalDetail, fakeCreditCard: FakeCreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>
    (this.apiUrl + 'rentals/paymentadd',
      {
        rental:
          {
            'carId': rental.carId,
            'customerId': rental.customerId,
            'returnDate': rental.returnDate
          },
        fakeCreditCardModel:
          {
            'cardNumber': fakeCreditCard.cardNumber,
            'cardHolderName': fakeCreditCard.cardHolderName,
            'expirationYear': parseInt(fakeCreditCard.expirationYear.toString()),
            'expirationMonth': parseInt(fakeCreditCard.expirationMonth.toString()),
            'cvv': fakeCreditCard.cvv
          }
      });
  }
}