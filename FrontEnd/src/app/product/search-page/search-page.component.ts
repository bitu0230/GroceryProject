import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  productList: Product[] = [];
  searchText?: string;
  constructor(private productService: ProductService,private router: Router) { }
  ngOnDestroy(): void {
    console.log(this.productList);

    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {

    this.search();

  }
  productDetails(product: Product){
    this.router.navigate(["product-details",product.productId])
   }
  search(): void {
    this.searchText = this.productService.getSearchedText();
    this.subscription = this.productService.getSearchedProducts().subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (err) => {
        console.error(err);
        alert(err);
      },
    });
  }

}