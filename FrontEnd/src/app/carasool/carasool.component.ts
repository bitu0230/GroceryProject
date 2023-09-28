import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carasool',
  templateUrl: './carasool.component.html',
  styleUrls: ['./carasool.component.scss']
})
export class CarasoolComponent {


  public getJsonValue: any;

  public postJsonValue: any;

 constructor(private http: HttpClient) {
  
     
 }
  // ngOnInit(): void {
  //   this.getMethod();
  // }

  // public getMethod(){
  //   this.http.get('http://localhost:8000/api/soti/products/104').subscribe();
  // }
}
