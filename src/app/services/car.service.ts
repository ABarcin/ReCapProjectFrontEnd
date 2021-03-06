import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarUpdateModel } from '../models/carUpdateModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/SingleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  constructor(private httpClient:HttpClient) { }
  filterText="";
  apiUrl="https://localhost:44373/api/";
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getallcarsdetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"cars/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarById(carId: number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcarsdetailbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarByCarId(carId: number):Observable<SingleResponseModel<CarUpdateModel>>{
    let newPath=this.apiUrl+"cars/getbyid?Id="+carId
    return this.httpClient.get<SingleResponseModel<CarUpdateModel>>(newPath);
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }
}
