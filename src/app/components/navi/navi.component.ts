import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  filterText = '';
  userName="";
  password="";
  constructor(private carService:CarService,private router:Router) { }

  ngOnInit(): void {
  }
  getFilterCars(filterText:string){
    this.filterText=filterText;
    this.carService.setCarFilter(this.filterText);
    
    
  }
}
