import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brands:Brand;
  brandUpdateForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {this.activatedRoute.params.subscribe(params => {
    if(params["brandId"]){
      this.getById(params["brandId"]);
      this.createBrandUpdateForm();
    }
  });
    
  }

  getById(brandId:number) {
    this.brandService.getById(brandId).subscribe(response => {
      this.brands = response.data;
      
    });
  }

  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required],
    })
  }

  updateBrands(){
    this.brandUpdateForm.patchValue({brandId:this.brands.brandId})
    if(this.brandUpdateForm.valid){
      let brandModel=Object.assign({},this.brandUpdateForm.value)
      this.brandService.updateBrands(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=> {
        if(responseError.errors.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
             this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
         
        }
      })

    }else{
      this.toastrService.error("Eksik veya Hatalı yazdınız." ,"Dikkat..!")
    }
     
  }

}
