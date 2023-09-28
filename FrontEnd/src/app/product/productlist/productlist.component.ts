import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit, OnDestroy {
  products: Product[] =[];
  sub$?: Subscription;
  roles?:string;

  constructor(private productService: ProductService,private router:Router) { }
   ngOnInit(): void {
    this.sub$ = this.productService.getProducts().subscribe({
      next: (data) => {this.products = data},
      error: (err) => {console.error(err);alert(err);}
    })
    if(sessionStorage.getItem("role")){
      this.roles=sessionStorage.getItem("role")?.toString();
    }
   }
   ngOnDestroy(): void {
     this.sub$?.unsubscribe();
   }

   productDetails(product: Product){
  
    this.router.navigate(["product-details",product.productId])
    
   }

}
