import { Component, ElementRef, Input, OnDestroy, OnInit, Provider } from '@angular/core';
import { NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription, subscribeOn } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardbody',
  templateUrl: './cardbody.component.html',
  styleUrls: ['./cardbody.component.scss']
})
export class CardbodyComponent implements OnInit, OnDestroy {
  // get all categories

  categories: Category[] = [];
  sub$?: Subscription;
  roles?:string;
  constructor(private categoryService: CategoryService, private productService: ProductService, private e1 :ElementRef,private router:Router){}
  ngOnInit(): void {
    this.sub$ = this.categoryService.getCategories().subscribe({
      next: (data) => {this.categories = data; console.log(data)},
      error: (err) => {console.error(err)}
    });
    if(sessionStorage.getItem("role")){
      this.roles=sessionStorage.getItem("role")?.toString();
    }
  }
  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }
    // get product by category Id
    products: Product[] = [];
    OnClicked(category :Category){
     // console.log(category.CategoryId)
     this.sub$ = this.productService.getProductsByCategoryId(category.categoryId!).subscribe(
      {
        next:(Data) => {this.products=Data  ;console.log(Data)},
        error: (err)=>{console.log(err); alert(err)}
      }
     )
     const targetDiv = this.e1.nativeElement.querySelector('#listProducts');
     if (targetDiv) {
       targetDiv.scrollIntoView({ behavior: 'smooth' });
     }

    }
    productDetails(product: Product){
      //console.log("kjaedkfajbwldjbald")
      //console.log(product)
      this.router.navigate(["product-details",product.productId])
     }
}
