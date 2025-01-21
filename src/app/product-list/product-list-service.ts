import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    apiUrl: string;

    // Dependency Injection of HttpClient
    constructor(private httpClient: HttpClient) {
        this.apiUrl = 'http://localhost:8080/api/products';
    }

    getProducts(): Observable<any> {
        return this.httpClient.get(this.apiUrl);
    }

    getProductById(Id: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + '/' +Id);
    }
    addProduct(product:any) : Observable<any>{
        return this.httpClient.post(this.apiUrl,product);
    }
    deleteProduct(id: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + '/' + id);
    }
    updateProduct(id: number,product: any): Observable<any> {
        return this.httpClient.put<any>(
          this.apiUrl + '/' + id,
          product
        );
      }
}