import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  carImages: CarImage[] = [];
  dataLoaded = false;
  imageBaseUrl = "https://localhost:44373";
  constructor(private carImageService: CarImageService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getCarImages();
  }
  getCarImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }
  getCarImage(carImage:CarImage){
    return this.sanitizer.bypassSecurityTrustUrl(carImage.imagePath);
  }
}
