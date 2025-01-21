import { Component } from '@angular/core';
import { ProductService } from './product-list-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productsList: any; // List of all products
  searchQuery: string = ''; // Search query entered by the user
  filteredProductsList:any; // List of products filtered by search query

    // props related to pagination
    paginatedProductsList: any;
    currentPage: number = 1;
    pageSize: number = 5;
  

// Injecting ProductService and Router
  constructor(private router: Router, private productService: ProductService) {
    this.productsList = []; // Initialize the products list
    this.filteredProductsList = []; // Initialize the filtered products list
    this.paginatedProductsList = []; // Initialize the paginated products list
  }
   // ngOnInit is a lifecycle hook called by Angular to indicate that Angular is done creating the component
   ngOnInit() {
    this.loadProducts(); // Load products when the component is initialized
    this.updatedpaginatedProductsList(); // Paginate products when the component is initialized
  }
  updatedpaginatedProductsList(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProductsList = this.filteredProductsList.slice(startIndex,endIndex);
  }
  changePage(page: number): void {
    console.log(page);
    this.currentPage = page;
    this.updatedpaginatedProductsList();
  }
   // 12 records / page size = 5
  // total number of pages = 3 => [1, 2, 3]
  get pages(): number[] {

      // number of pages
      const totalPages = Math.ceil(this.filteredProductsList.length / this.pageSize);

      const pages: number[] = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.productsList = data;// Set the productsList with the fetched products
      this.filteredProductsList = data;// Initialize the filteredProductsList with all products
    });
  }
  ngAfterViewInit(): void {
    console.log("ViewProductsComponent View initialized"); // Log the initialization of
  }
  onSearch(): void {
    if (this.searchQuery) {
      // If there is a search query, filter the productsList
      this.filteredProductsList = this.productsList.filter(
        (product: { title: string }) =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      
      console.log(this.filteredProductsList);
    } else {
      // If there is no search query, show all products
      this.filteredProductsList = this.productsList;
    }
  }
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.router.navigate(['/products']).then(() => {
          // After navigation, refresh the page
          window.location.reload(); // This will reload the page
        });
      });
    }
  }
}
