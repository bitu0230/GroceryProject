import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = []
  baseUrl = "http://localhost:34567/api/soti/products"
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

  getProductsByCategoryId(categoryId: number):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/getProductByCategoryId/${categoryId}`)
  }

  getSearchedProducts( ):Observable<Product[]>{
    const params= new HttpParams()
  .set('productName',this.productName!)
  .set('productPrice',this.productPrice!);
    return this.http.get<Product[]>(this.baseUrl+'/getSearchedProducts',{params} );
    
  }

  setSearchDetails( searchText:string,productName:string ,productPrice:number):void{

    this.searchText= searchText;

    this.productName=productName;

    this.productPrice=productPrice;

  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/AllProducts`)
  }

  getProductsById(productId: number):Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/getProductById/${productId}`, { headers: this.authHeader })
  }

  updateProduct(productId: number, product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/updateProduct/${productId}`,product, { headers: this.authHeader })
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addProduct`, product);
  }

  getSearchedText():string{

    if(this.searchText==null)
    {

      return "";

    }

    return this.searchText!;

  }
}
