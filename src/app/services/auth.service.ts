import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponseModel } from '../models/itemResponseModel';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44308/api/auth";
  constructor( private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<ItemResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}
