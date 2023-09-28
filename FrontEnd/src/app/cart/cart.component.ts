import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  sub$?: Subscription;
  cartList?: Cart[] = [];
  total : number = 0;
  cartStock:number=0;
  subtotal:number=0;
  userId?:number;
 
  constructor(private cartService: CartService , private router: Router,private activatedRoute:ActivatedRoute) { }
 
  
  ngOnInit(): void {
    this.userId=Number(sessionStorage.getItem("id"));
    this.cartService.getCartForUser(this.userId).subscribe({
      next:(data)=>{this.cartList=data; console.log(data);    this.subtotalfunction()
      },
      error:(err)=>{console.log(err); alert(err);}
    });
   
   }

   subtotalfunction():void{
    console.log("subtotal working",this.subtotal)
    console.log(this.cartList)
    this.subtotal = 0; 
    if (this.cartList) {
    this.cartList.forEach((element) => {
      if(element.cartStock!==undefined || element.productPrice!==undefined){
        this.subtotal= this.subtotal + element.cartStock! * element.productPrice! ;
      }
      console.log(this.subtotal);
    });
    console.log(this.subtotal)
  }
   }

   updateCartIncrementStock(cart:Cart):void{
    if(cart.cartStock)
    {
      cart.cartStock = cart.cartStock +1 ;
      this.cartService.updateCartStock(cart).subscribe({
        next:(data)=>{console.log(data) ;this.subtotalfunction()},
        error:(err)=>{console.log(err);alert(err)}
      })
    }
   }
   updateCartDecrementStock(cart:Cart):void{
    if(cart.cartStock)
    {
      cart.cartStock = cart.cartStock -1 ;
      if(cart.cartStock==0){
        this.deleteCart(cart);
      }
      this.cartService.updateCartStock(cart).subscribe({
        next:(data)=>{console.log(data);this.subtotalfunction();},
        error:(err)=>{console.log(err);alert(err);}
      })
    }
   }

   deleteCart(cart:Cart):void{
    if(cart.cartId){  
    this.cartService.deleteCart(cart.cartId).subscribe({
      next:(data)=>{console.log(data);window.location.reload(); this.subtotalfunction()},
        error:(err)=>{console.log(err);alert(err);}
    })
  }
   }

 
   ngOnDestroy(): void {
     this.sub$?.unsubscribe();
   }
}
