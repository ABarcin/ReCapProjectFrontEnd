import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: Car[] = [];
  carImages: CarImage[] = [];
  dataLoaded = false;
  imageBaseUrl = 'https://localhost:44373';
  constructor(
    private CarService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
        this.getCarImageByCar(params['carId']);
      }
    });
  }
  getCarById(carId: number) {
    this.CarService.getCarById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    });
  }
  getCarImageByCar(carId: number) {
    this.carImageService.getCarImageByCar(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }
  getCurrentSliderImageClass(sliderImage: CarImage): string{
    if (this.carImages[0] === sliderImage)
       return 'carousel-item active'

    return 'carousel-item'
 }
}
