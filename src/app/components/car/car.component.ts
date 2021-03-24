import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  brandForm:FormGroup;
  colorForm:FormGroup;
  cars: Car[] = [];
  brands:Brand[]=[];
  colors:Color[]=[];
  carImages: CarImage[] = [];
  dataLoaded = false;
  filterText="";
  imageBaseUrl = 'https://localhost:44373';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      }
      else {
        this.getCars();
        this.getBrands();
        this.getColors();
        this.getCarImages();
      }
      this.brandForm = this.formBuilder.group({
        brand:[null]
      });
      this.colorForm = this.formBuilder.group({
        color:[null]
      });
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.toastrService.success("Filtre Uygulandı",this.cars[0].carName)
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetails(carId: number) {
    this.carImageService.getCarImageByCar(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }
  getCarImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
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


 getBrandSubmit() {
  this.carService.getCarsByBrand(this.brandForm.get('brand').value).subscribe((response) => {
    this.cars = response.data;
    this.dataLoaded = true;
    if(this.cars.length>0)
    this.toastrService.success("Filtered By Brand",this.cars[0].brandName)
    else{
      this.toastrService.error("No Vehicle Matching The Filter Found")
    }
    
  });
}
getColorSubmit() {
  this.carService.getCarsByColor(this.colorForm.get('color').value).subscribe((response) => {
    this.cars = response.data;
    this.dataLoaded = true;
    if(this.cars.length>0)
    this.toastrService.success("Filtered By Color",this.cars[0].colorName)
    else{
      this.toastrService.error("No Vehicle Matching The Filter Found")
    }
  });
}
}
