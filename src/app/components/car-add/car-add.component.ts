import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup;
  constructor(private toastrService:ToastrService,private carService:CarService,private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm() {
    this.carAddForm = this.formBuilder.group({
      carName: ['', Validators.required],
      brandId:['',Validators.required],
      colorId:['',Validators.required],
      dailyPrice:['',Validators.required],
      modelYear:['',Validators.required],
      description:['',Validators.required]
      
    });
  }
  add(){
    if(this.carAddForm.valid){
      let carModel=Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
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
