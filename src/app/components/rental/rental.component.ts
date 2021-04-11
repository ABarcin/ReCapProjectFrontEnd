import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { RentalAddModel } from 'src/app/models/rentalAddModel';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  creditCard:CreditCard;
  creditCardCheck:Boolean;
  rentalAddForm:FormGroup;
  carId:number;
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
    private toastrService:ToastrService,
    private paymentService:PaymentService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId=params['carId']
        this.getCarById(params['carId']);
        this.createRentalForm();
      }
    });
  }
  createRentalForm() {
    this.rentalAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName:['',Validators.required],
      creditCardNumber:['',Validators.required],
      yearNumber:['',Validators.required],
      monthNumber:['',Validators.required],
      cvcNumber:['',Validators.required]
      
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
      }else{
        this.toastrService.error("Enter a Valid Date")
      }
    }
  }
 
  setPayString(){
    this.pay="field";
  }
  rentalCar(){
    if(this.rentalAddForm.valid){
      let creditCardModel=Object.assign({},this.rentalAddForm.value)
      this.paymentService.payment(creditCardModel).subscribe(response=>{
        let rentCar: RentalAddModel = {
          carId:this.carId,
          customerId:1,
          rentDate:this.rentDay,
          returnDate:this.returnDay
        };
        this.rentalService.add(rentCar).subscribe(response=>{
          this.toastrService.success(response.message,"Success")
        },responseError=>{
          if(responseError.error.Errors.length>0)
          console.log(responseError.error.Errors)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Success Fault")
          }
            
        })
        this.toastrService.success(response.message,"Success")
      },responseError=>{
        if(responseError.error.Errors.length>0)
        console.log(responseError.error.Errors)
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Success Fault")
        }
      })
    }else{
      this.toastrService.error("Error Form","Atention")
    }
  }
}
