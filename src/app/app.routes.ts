import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
export const routes: Routes = [
    {path:'',component:HomeComponent },
    {path:'products',component:ProductListComponent },
    {path:'view-product/:id',component:ViewProductComponent },
    {path:'add-product',component:AddProductComponent },
    {path:'edit-product/:id',component:EditProductComponent }
];
