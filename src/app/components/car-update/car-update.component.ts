import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarUpdateModel } from 'src/app/models/carUpdateModel';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  car:CarUpdateModel;
  carUpdateForm:FormGroup;
  dataLoaded=false;
  constructor(private toastrService:ToastrService,private carService:CarService,private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarByCarId(params['carId']);
        this.createCarUpdateForm();
      }
    });
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carName: ['', Validators.required],
      carId:['',Validators.required],
      brandId:['',Validators.required],
      colorId:['',Validators.required],
      dailyPrice:['',Validators.required],
      modelYear:['',Validators.required],
      description:['',Validators.required]
      
    });
  }
  getCarByCarId(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.car = response.data;
      this.dataLoaded = true;
    });
  }
  update(){
    if(this.carUpdateForm.valid){
      let carUpdateModel=Object.assign({},this.carUpdateForm.value)
      this.carService.update(carUpdateModel).subscribe(response=>{
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
