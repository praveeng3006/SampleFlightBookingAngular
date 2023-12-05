import { Injectable } from '@angular/core';
import { UserSelectedFlightsData } from '../Models/UserSelectedFlightsDetails';
@Injectable({
  providedIn: 'root'
})
export class SharedService{

  public userSelectedFlightsData!:UserSelectedFlightsData;
  
  constructor() { }
  GetUserSelectedFlightsData():UserSelectedFlightsData{
    return this.userSelectedFlightsData;
    }
  SetUserSelectedFlightsData(value:UserSelectedFlightsData){
      this.userSelectedFlightsData=value;
      }
}
