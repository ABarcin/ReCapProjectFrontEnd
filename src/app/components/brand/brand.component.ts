import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { HttpClient } from '@angular/common/http';
import { BrandResponseModel } from 'src/app/models/brandResponseModel';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  dataLoaded=false;

  constructor(private BrandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands(){
    this.BrandService.getBrands().subscribe(response=>{
      this.brands=response.data
      this.dataLoaded=true;
    })
  }
}
