import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brands:Brand[]=[];
  brandId:number;
  brandUpdateForm:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder,private toastrService:ToastrService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.brandId=(params['brandId'])
        this.createBrandUpdateForm();
      }
    });
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      brandId:new FormControl()
     });
  }
  update(){
    if(this.brandUpdateForm.valid){
      let brandModel=Object.assign({},this.brandUpdateForm.value)
      this.brandService.update(brandModel).subscribe(response=>{
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
