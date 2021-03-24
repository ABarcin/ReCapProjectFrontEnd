import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  day:number=1;
  price:number=0;
  rentDay: Date;
  returnDay: Date;
  carDetail: Car[] = [];
  dataLoaded = false;
  pay:string=""
  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
      }
    });
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    });
  }
  calculateTotalPrice() {
    if (this.rentDay && this.returnDay) {
      let returnDate=new Date(this.returnDay)
      let rentDate=new Date(this.rentDay)
      let rentDaysCount=Math.round((returnDate.getTime()-rentDate.getTime()) / (1000 * 60 * 60 * 24))+1;  
      if (rentDaysCount > 0) {
        this.day=rentDaysCount
        console.log(this.day)
      }else{
        this.toastrService.error("Enter a Valid Date")
      }
    }
  }
  setPayString(){
    this.pay="field";
  }
}
