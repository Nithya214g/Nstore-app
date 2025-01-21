import { Component } from '@angular/core';
import { ProductService } from '../product-list/product-list-service';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-product',
  imports: [CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
product:any;
productId: number;
constructor(private route: ActivatedRoute,private ProductService: ProductService ) {
  this.product=[];
  this.productId = this.route.snapshot.params['id'];

}
ngOnInit() {
  this.ProductService.getProductById(this.productId).subscribe((data)=>{
    this.product=data;
  })

}
}
