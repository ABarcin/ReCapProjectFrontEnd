import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  email = this.localStorageService.get('email');
  userName: string = '';
  showForm: string = 'show';
  constructor(
    private carService: CarService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.getUser(this.email);
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  getUser(email: string) {
    if (this.email) {
      this.userService.getUser(email).subscribe((response) => {
        this.userName = response.data.firstName + ' ' + response.data.lastName;
        this.user = response.data;
      });
      this.showForm = '';
    } else {
      this.showForm = 'show';
    }
  }
  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          this.localStorageService.set('token', response.data.token);
          this.localStorageService.set('email', this.loginForm.value.email);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
  logout() {
    this.localStorageService.clean();
    this.toastrService.error('Logout');
    this.router.navigate(["/cars"]);
  }
}
