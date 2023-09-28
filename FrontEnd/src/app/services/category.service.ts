import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private authHeader!: HttpHeaders;

  baseUrl : string ="http://localhost:34567/api/soti/categories"
  constructor(private http: HttpClient) { 
    let authorizeData = 'Bearer ' + sessionStorage.getItem("token");
    

    console.log(authorizeData);

    this.authHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authorizeData
    })
  }
  getCategories():Observable<Category[]>{

    return this.http.get<Category[]>(`${this.baseUrl}/GetAllCategories`)
  }
  
   addCategory(_categoryName:string,_categoryImage:string):Observable<Boolean>{
     const category= new Category();
     
      category.categoryName=_categoryName;
      category.categoryImage=_categoryImage;
     
     category.categoryName
    return this.http.post<Boolean>(this.baseUrl+"/AddCategory",category, { headers: this.authHeader });
  }
}

