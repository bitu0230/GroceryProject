import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  isSuccessful:Boolean=true
  sub$?: Subscription;
  roles?: string;
  constructor(private productService: ProductService, private router: Router,private activatedRoute:ActivatedRoute,private cartService:CartService) { }

  
   ngOnInit(): void {
    const productId= Number (this.activatedRoute.snapshot.paramMap.get("productId"));
    this.sub$ = this.productService.getProductsById(productId).subscribe({
      next: (data) => {this.product = data;},
      error: (err) => {console.error(err);alert(err);}
    })
    if(sessionStorage.getItem("role")){
      this.roles=sessionStorage.getItem("role")?.toString();
    }
    
   }

   navigateToEditDetails(productId?: number) {
    // Navigate to the "Edit Details" page with the product's id as a route parameter
    this.router.navigate(['/edit-details', productId]);
  }
   ngOnDestroy(): void {
     this.sub$?.unsubscribe();
   }
   addToCart(): void{
    this.cartService.addToCart(this.product).subscribe({
      next:(data)=>{console.log(data);
      this.router.navigate(["cart"])
      },
      error:(err)=>{console.log(err);
        alert("the product is alredy added to cart")
      }
    })
   
   }
}