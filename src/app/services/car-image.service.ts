import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44373/api/';
  getCarImages(): Observable<ListResponseModel<CarImage>> {
    let newPath=this.apiUrl+"carImages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  getCarImageByCar(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath=this.apiUrl+"carImages/getbycarId?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
