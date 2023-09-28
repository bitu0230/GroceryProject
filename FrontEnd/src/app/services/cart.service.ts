import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList: Cart[] = []
  baseUrl = "http://localhost:34567/api/soti/cart"
  public productName?:string;
  public productPrice?:number;
  searchText?:string;
  private authHeader!: HttpHeaders;
  constructor(private http: HttpClient) { 
    let authorizeData = 'Bearer ' + sessionStorage.getItem("token");

    console.log(authorizeData);

    this.authHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authorizeData
    })
  }

  getCartForUser(userId:number):Observable<Cart[]>{
    return this.http.get<Cart[]>(this.baseUrl+"/getCart",{params:{"userId":userId}})
  }

  updateCartStock(cart:Cart):Observable<number>{
    return this.http.put<number>(this.baseUrl+"/changeCartStock",cart)
  }

  deleteCart(cartId:number):Observable<Boolean>{
    return this.http.delete<Boolean>(this.baseUrl+"/deleteCart",{params:{"cartId":cartId}});
  }

  addToCart(product:Product):Observable<Boolean>{
    const cartBody= new Cart()
    cartBody.cartStock=1;
    cartBody.productDescription=product.description;
    cartBody.productId=product.productId;
    cartBody.productImage= product.productImage;
    cartBody.productName= product.productName;
    cartBody.productPrice=product.unitPrice;
    cartBody.userId= Number(sessionStorage.getItem("id"));
    return this.http.post<Boolean>(this.baseUrl+"/addToCart",cartBody);
  }
  

}
