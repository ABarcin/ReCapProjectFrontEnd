import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm:FormGroup;
  user:User;
  dataLoaded="false";
  email = this.localStorageService.get('email');
  constructor(private toastrService:ToastrService,private userService:UserService,private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    if(this.email){
      this.getUser(this.email)
    }

  }
  createCarUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required]
    });
  }
  update(){
    if(this.userUpdateForm.valid){
      let userModel=Object.assign({},this.userUpdateForm.value)
      this.userService.update(userModel).subscribe(response=>{
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
  getUser(email:string){
      this.userService.getUser(email).subscribe((response)=>{
        this.user=response.data
        this.dataLoaded="true";
      })
  }
}
