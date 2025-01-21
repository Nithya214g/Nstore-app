import { Component} from '@angular/core';
import { ProductService } from '../product-list/product-list-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})

export class EditProductComponent {
  product:any;
  productId: number;
  editproduct: FormGroup;
  formValid = false;
  isSubmitted = false;
  errorMessage: string = '';

  constructor(private formBuilder:FormBuilder, private ProductService: ProductService, private router: Router, private route: ActivatedRoute ) {
    this.product=[];
    this.productId = this.route.snapshot.params['id'];
    this.editproduct = this.formBuilder.group({
      title: ['', [Validators.required,]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

  }
  get f() {
    return this.editproduct.controls;
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ProductService.getProductById(id).subscribe((data)=>{
    this.product=data;
    })
  }

  // Update product
  updateProduct() {
    console.log('Form submitted successfully', this.editproduct.value);
    if (this.editproduct.valid) {
      this.formValid = true;
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.ProductService.updateProduct(id, this.editproduct.value).subscribe((response) => {
          console.log('Form submitted successfully', response);
          this.isSubmitted = true;
          this.router.navigate(['/products']);
        });
    } else {
      console.log("Please fill out the form correctly.");
      this.errorMessage = "Please fill out the form correctly.";
    }
  }

}
