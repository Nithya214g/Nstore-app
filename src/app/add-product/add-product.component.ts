import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product-list/product-list-service';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  addproduct: FormGroup;
  formValid = false;
  isSubmitted = false;
  errorMessage: string = '';

  constructor(private formBuilder:FormBuilder,private ProductService:ProductService, private router: Router){
    this.ProductService = ProductService;
    this.addproduct = this.formBuilder.group({
      title: ['', [Validators.required,]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  get f() {
    return this.addproduct.controls;
  }


  onSubmit() {
    if (this.addproduct.valid) {
      this.formValid = true;
      this.ProductService.addProduct(this.addproduct.value).subscribe((response) => {
          console.log('Form submitted successfully', response);
          this.isSubmitted = true;
          this.addproduct.reset();
          this.router.navigate(['/products']);
        });
    } else {
      this.formValid = false;
      this.errorMessage = "Please fill out the form correctly.";
    
    }
  }
}

