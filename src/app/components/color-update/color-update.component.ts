import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm:FormGroup;
  colorId:number;
  constructor(private colorService:ColorService,private toastrService:ToastrService,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.colorId=(params['colorId'])
        this.createColorUpdateForm();
      }
    });
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ['', Validators.required],
      colorId:['',Validators.required]
     });
  }
  update(){
    if(this.colorUpdateForm.valid){
      let colorModel=Object.assign({},this.colorUpdateForm.value)
      this.colorService.update(colorModel).subscribe(response=>{
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
